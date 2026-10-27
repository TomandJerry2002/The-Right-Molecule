import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone

from .models import Order

logger = logging.getLogger(__name__)


def send_order_confirmation(order_id, force=False):
    """
    Email the customer their order confirmation, and notify the store (ORDER_NOTIFY_EMAILS).
    Sent at most once per order unless force=True (admin "resend"). Never raises: a mail
    failure must not break the payment webhook. Returns True if the customer email was sent.
    """
    claim = Order.objects.filter(pk=order_id, status=Order.Status.PAID)
    if not force:
        claim = claim.filter(confirmation_sent_at__isnull=True)
    # Claim the send first so two webhooks arriving together can't both send.
    if not claim.update(confirmation_sent_at=timezone.now()):
        return False

    order = Order.objects.prefetch_related('items').get(pk=order_id)
    context = {'order': order, 'items': order.items.all(), 'support_email': settings.SUPPORT_EMAIL}
    try:
        message = EmailMultiAlternatives(
            subject=f'Your order {order.order_id} is confirmed',
            body=render_to_string('store/emails/order_confirmation.txt', context),
            to=[order.email],
            reply_to=[settings.SUPPORT_EMAIL],
        )
        message.attach_alternative(render_to_string('store/emails/order_confirmation.html', context), 'text/html')
        message.send()
    except Exception:
        logger.exception('Could not send confirmation email for %s', order.order_id)
        Order.objects.filter(pk=order_id).update(confirmation_sent_at=None)
        return False
    logger.info('Sent confirmation email for %s', order.order_id)

    if settings.ORDER_NOTIFY_EMAILS:
        try:
            EmailMultiAlternatives(
                subject=f'New order {order.order_id} · ₹{order.total} · {order.customer_name}',
                body=render_to_string('store/emails/new_order_notification.txt', context),
                to=settings.ORDER_NOTIFY_EMAILS,
            ).send()
        except Exception:
            logger.exception('Could not send store notification for %s', order.order_id)
    return True
