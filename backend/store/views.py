import json
import logging

from django import forms
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from . import cashfree, services
from .forms import CheckoutForm, WaitlistForm, clean_items
from .models import Order, Product, WaitlistEntry, WebhookEvent

logger = logging.getLogger(__name__)

# The API takes JSON and uses no cookies or sessions, so CSRF protection does not apply.
# Browser access is limited by CORS (see CORS_ALLOWED_ORIGINS).


def _json_body(request):
    try:
        data = json.loads(request.body or b'{}')
    except ValueError:
        return None
    return data if isinstance(data, dict) else None


def _error(message, status=400, errors=None):
    body = {'error': message}
    if errors:
        body['errors'] = errors
    return JsonResponse(body, status=status)


@require_GET
def product_list(request):
    products = [
        {
            'sku': p.sku,
            'name': p.name,
            'flavour': p.flavour,
            'sachets': p.sachets,
            'price': str(p.price),
        }
        for p in Product.objects.filter(is_active=True)
    ]
    return JsonResponse({
        'products': products,
        'shipping_fee': str(services.to_money(settings.SHIPPING_FEE_INR)),
        'max_quantity': settings.MAX_QTY_PER_ITEM,
    })


@csrf_exempt
@require_POST
def checkout(request):
    data = _json_body(request)
    if data is None:
        return _error('Request body must be a JSON object.')

    form = CheckoutForm(data)
    if not form.is_valid():
        return _error('Please check your details.', errors=form.errors.get_json_data())
    try:
        lines = clean_items(data.get('items'))
    except forms.ValidationError as exc:
        return _error(exc.messages[0])

    try:
        order = services.create_order(form.cleaned_data, lines)
    except cashfree.CashfreeError:
        return _error('We could not start the payment. Please try again in a moment.', status=502)

    return JsonResponse({
        'order_id': order.order_id,
        'payment_session_id': order.payment_session_id,
        'amount': str(order.total),
        'cashfree_mode': settings.CASHFREE_ENV,
    }, status=201)


@require_GET
def order_status(request, order_id):
    """
    Called by the return page after Cashfree redirects back. Re-checks with Cashfree so
    the page shows the real status even if the webhook hasn't arrived yet.
    Returns no personal details: the order ID is the only "key" here.
    """
    order = get_object_or_404(Order, order_id=order_id)
    if order.status == Order.Status.PENDING:
        try:
            order = services.sync_order(order)
        except cashfree.CashfreeError:
            pass  # Show the last known status; the webhook will catch up.

    last_payment = order.payments.first()
    return JsonResponse({
        'order_id': order.order_id,
        'status': order.status,
        'total': str(order.total),
        'items': [
            {'name': i.product_name, 'flavour': i.flavour, 'quantity': i.quantity, 'unit_price': str(i.unit_price)}
            for i in order.items.all()
        ],
        'payment': {'status': last_payment.status, 'message': last_payment.message} if last_payment else None,
        # Lets the page offer "Try again" without creating a new order.
        'payment_session_id': order.payment_session_id if order.status == Order.Status.PENDING else None,
        'cashfree_mode': settings.CASHFREE_ENV,
    })


@csrf_exempt
@require_POST
def cashfree_webhook(request):
    raw = request.body
    valid = cashfree.verify_webhook_signature(
        raw,
        request.headers.get('x-webhook-timestamp', ''),
        request.headers.get('x-webhook-signature', ''),
    )
    try:
        payload = json.loads(raw)
    except ValueError:
        payload = None
    if not isinstance(payload, dict):
        payload = {}
    data = payload.get('data') or {}
    order_id = str((data.get('order') or {}).get('order_id', ''))

    event = WebhookEvent(
        event_type=str(payload.get('type', ''))[:60],
        order_id=order_id[:45],
        signature_valid=valid,
        body=raw.decode('utf-8', 'replace'),
    )
    if not valid:
        event.error = 'Invalid signature'
        event.save()
        logger.warning('Rejected Cashfree webhook with invalid signature (order %s)', order_id)
        return _error('Invalid signature', status=400)

    # Replays are harmless: payments are upserted by cf_payment_id and mark_paid is idempotent.
    payment = data.get('payment') or {}
    if payment.get('cf_payment_id') is not None and payment.get('payment_status') in services.PAYMENT_STATUSES:
        try:
            order = Order.objects.get(order_id=order_id)
            services.record_payment(order, payment)
        except Order.DoesNotExist:
            event.error = 'Unknown order'
            logger.warning('Cashfree webhook for unknown order %s', order_id)
        except Exception as exc:
            event.error = repr(exc)
            event.save()
            logger.exception('Failed to process Cashfree webhook for %s', order_id)
            return _error('Processing failed', status=500)  # Cashfree will retry.

    event.save()
    return JsonResponse({'ok': True})


@csrf_exempt
@require_POST
def waitlist_join(request):
    data = _json_body(request)
    if data is None:
        return _error('Request body must be a JSON object.')
    form = WaitlistForm(data)
    if not form.is_valid():
        return _error('Please check your details.', errors=form.errors.get_json_data())

    answers = data.get('answers') or []
    if not isinstance(answers, list) or len(json.dumps(answers)) > 10_000:
        answers = []

    # Joining twice with the same email returns the same member number.
    entry, _ = WaitlistEntry.objects.get_or_create(
        email=form.cleaned_data['email'],
        defaults={
            'name': form.cleaned_data['name'],
            'source': form.cleaned_data['source'] or WaitlistEntry.Source.WAITLIST,
            'answers': answers,
        },
    )
    return JsonResponse({'memberNumber': entry.member_number})
