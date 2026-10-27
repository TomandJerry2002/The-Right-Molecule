"""
Thin client for the Cashfree Payment Gateway REST API.

Docs: https://www.cashfree.com/docs/api-reference/payments/latest/orders/create
"""

import base64
import hashlib
import hmac
import logging

import requests
from django.conf import settings

logger = logging.getLogger(__name__)

BASE_URLS = {
    'sandbox': 'https://sandbox.cashfree.com/pg',
    'production': 'https://api.cashfree.com/pg',
}
TIMEOUT = 15  # seconds


class CashfreeError(Exception):
    pass


def _base_url():
    try:
        return BASE_URLS[settings.CASHFREE_ENV]
    except KeyError:
        raise CashfreeError(f"CASHFREE_ENV must be 'sandbox' or 'production', not {settings.CASHFREE_ENV!r}")


def _headers():
    if not settings.CASHFREE_CLIENT_ID or not settings.CASHFREE_CLIENT_SECRET:
        raise CashfreeError('CASHFREE_CLIENT_ID / CASHFREE_CLIENT_SECRET are not configured.')
    return {
        'x-client-id': settings.CASHFREE_CLIENT_ID,
        'x-client-secret': settings.CASHFREE_CLIENT_SECRET,
        'x-api-version': settings.CASHFREE_API_VERSION,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }


def _request(method, path, **kwargs):
    url = _base_url() + path
    try:
        resp = requests.request(method, url, headers=_headers(), timeout=TIMEOUT, **kwargs)
    except requests.RequestException as exc:
        logger.error('Cashfree %s %s failed: %s', method, path, exc)
        raise CashfreeError('Could not reach Cashfree.') from exc
    if resp.status_code >= 400:
        logger.error('Cashfree %s %s -> %s: %s', method, path, resp.status_code, resp.text[:500])
        try:
            message = resp.json().get('message', resp.text)
        except ValueError:
            message = resp.text
        raise CashfreeError(f'Cashfree error {resp.status_code}: {message}')
    return resp.json()


def create_order(order):
    """Create the order at Cashfree. Returns the response, which holds payment_session_id."""
    order_meta = {'return_url': settings.CHECKOUT_RETURN_URL.format(order_id=order.order_id)}
    if settings.BACKEND_PUBLIC_URL.startswith('https://'):
        # Cashfree only accepts https notify URLs.
        order_meta['notify_url'] = settings.BACKEND_PUBLIC_URL.rstrip('/') + '/api/webhooks/cashfree/'

    payload = {
        'order_id': order.order_id,
        'order_amount': float(order.total),
        'order_currency': 'INR',
        'customer_details': {
            'customer_id': order.phone,
            'customer_name': order.customer_name,
            'customer_email': order.email,
            'customer_phone': order.phone,
        },
        'order_meta': order_meta,
        'order_note': ', '.join(str(item) for item in order.items.all())[:200],
    }
    return _request('POST', '/orders', json=payload)


def fetch_order(order_id):
    return _request('GET', f'/orders/{order_id}')


def fetch_payments(order_id):
    return _request('GET', f'/orders/{order_id}/payments')


def verify_webhook_signature(raw_body, timestamp, signature):
    """
    Cashfree signs webhooks as base64(HMAC-SHA256(timestamp + raw_body, client_secret)).
    raw_body must be the exact bytes received, before any JSON parsing.
    """
    if not (timestamp and signature and settings.CASHFREE_CLIENT_SECRET):
        return False
    message = timestamp.encode() + raw_body
    digest = hmac.new(settings.CASHFREE_CLIENT_SECRET.encode(), message, hashlib.sha256).digest()
    expected = base64.b64encode(digest).decode()
    return hmac.compare_digest(expected, signature)
