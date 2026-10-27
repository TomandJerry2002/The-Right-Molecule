"""
Order and payment logic. Views and the admin call these; nothing else changes order status.

An order only becomes PAID when Cashfree tells us (signed webhook, or a server-side
fetch from the Cashfree API) and the amount matches what we charged. What the browser
reports after redirect is never trusted on its own.
"""

import logging
from decimal import Decimal, InvalidOperation

from django.conf import settings
from django.db import transaction
from django.utils import timezone
from django.utils.dateparse import parse_datetime

from . import cashfree, emails
from .models import Order, OrderItem, Payment

logger = logging.getLogger(__name__)

# Payment statuses we act on. Others (e.g. charges webhooks) are only logged.
PAYMENT_STATUSES = {'SUCCESS', 'FAILED', 'USER_DROPPED', 'PENDING', 'NOT_ATTEMPTED', 'CANCELLED', 'VOID'}


def to_money(value):
    try:
        return Decimal(str(value)).quantize(Decimal('0.01'))
    except (InvalidOperation, TypeError, ValueError):
        return Decimal('0.00')


def _parse_time(value):
    try:
        return parse_datetime(value) if value else None
    except ValueError:
        return None


def create_order(customer, lines):
    """
    customer: cleaned CheckoutForm data. lines: [(Product, quantity), ...].
    Creates the order locally, then at Cashfree. Raises CashfreeError if the gateway fails.
    """
    subtotal = sum((product.price * qty for product, qty in lines), Decimal('0.00'))
    shipping_fee = to_money(settings.SHIPPING_FEE_INR)

    with transaction.atomic():
        order = Order.objects.create(
            **customer,
            subtotal=subtotal,
            shipping_fee=shipping_fee,
            total=subtotal + shipping_fee,
        )
        OrderItem.objects.bulk_create([
            OrderItem(
                order=order,
                product=product,
                product_name=product.name,
                flavour=product.flavour,
                unit_price=product.price,
                quantity=qty,
            )
            for product, qty in lines
        ])

    try:
        resp = cashfree.create_order(order)
    except cashfree.CashfreeError:
        order.status = Order.Status.FAILED
        order.save(update_fields=['status', 'updated_at'])
        raise

    order.cf_order_id = str(resp.get('cf_order_id', ''))
    order.payment_session_id = resp.get('payment_session_id', '')
    order.save(update_fields=['cf_order_id', 'payment_session_id', 'updated_at'])
    logger.info('Created order %s for INR %s', order.order_id, order.total)
    return order


def mark_paid(order, amount):
    """Mark the order PAID if the amount matches. Safe to call repeatedly."""
    with transaction.atomic():
        order = Order.objects.select_for_update().get(pk=order.pk)
        if order.status == Order.Status.PAID:
            return True
        if to_money(amount) != order.total:
            logger.error('Order %s: paid amount INR %s does not match total INR %s. Not marking paid.',
                         order.order_id, amount, order.total)
            return False
        if order.status != Order.Status.PENDING:
            logger.warning('Order %s was %s but a successful payment arrived. Marking PAID.',
                           order.order_id, order.status)
        order.status = Order.Status.PAID
        order.paid_at = timezone.now()
        order.save(update_fields=['status', 'paid_at', 'updated_at'])
        pk = order.pk
        transaction.on_commit(lambda: emails.send_order_confirmation(pk))
    logger.info('Order %s PAID', order.order_id)
    return True


def record_payment(order, data):
    """Store a Cashfree payment entity (webhook data.payment or GET /payments item)."""
    payment, _ = Payment.objects.update_or_create(
        cf_payment_id=str(data['cf_payment_id']),
        defaults={
            'order': order,
            'status': str(data.get('payment_status', '')),
            'amount': to_money(data.get('payment_amount')),
            'payment_group': str(data.get('payment_group') or '')[:40],
            'message': str(data.get('payment_message') or '')[:255],
            'bank_reference': str(data.get('bank_reference') or '')[:100],
            'payment_time': _parse_time(data.get('payment_time')),
            'raw': data,
        },
    )
    if payment.status == 'SUCCESS':
        mark_paid(order, payment.amount)
    return payment


def sync_order(order):
    """Pull the latest order and payment state from Cashfree. Returns the refreshed order."""
    if not order.payment_session_id or order.status == Order.Status.FAILED:
        return order

    cf_order = cashfree.fetch_order(order.order_id)
    for data in cashfree.fetch_payments(order.order_id):
        if data.get('cf_payment_id') is not None:
            record_payment(order, data)

    order.refresh_from_db()
    cf_status = cf_order.get('order_status')
    if cf_status == 'PAID' and order.status != Order.Status.PAID:
        mark_paid(order, cf_order.get('order_amount'))
    elif cf_status in ('EXPIRED', 'TERMINATED') and order.status == Order.Status.PENDING:
        order.status = Order.Status.EXPIRED
        order.save(update_fields=['status', 'updated_at'])
    order.refresh_from_db()
    return order
