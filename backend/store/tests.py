import base64
import hashlib
import hmac
import json
from decimal import Decimal
from unittest import mock

from django.core import mail
from django.test import TestCase, override_settings

from . import cashfree, emails
from .models import Order, Payment, Product, WaitlistEntry, WebhookEvent

SECRET = 'test-secret'
SKU = 'pcos-harmony-passion-fruit'

CUSTOMER = {
    'customer_name': 'Ananya Rao',
    'email': 'ananya@example.com',
    'phone': '+91 98765 43210',
    'address_line1': '12 MG Road',
    'city': 'Bengaluru',
    'state': 'Karnataka',
    'pincode': '560001',
}


def sign(body, timestamp='1700000000000', secret=SECRET):
    digest = hmac.new(secret.encode(), timestamp.encode() + body, hashlib.sha256).digest()
    return base64.b64encode(digest).decode()


def webhook_body(order_id, status='SUCCESS', amount=1580.0, cf_payment_id=5114910498):
    return json.dumps({
        'type': f'PAYMENT_{status}_WEBHOOK',
        'event_time': '2026-10-27T12:00:00+05:30',
        'data': {
            'order': {'order_id': order_id, 'order_amount': amount, 'order_currency': 'INR'},
            'payment': {
                'cf_payment_id': cf_payment_id,
                'payment_status': status,
                'payment_amount': amount,
                'payment_currency': 'INR',
                'payment_message': 'ok',
                'payment_time': '2026-10-27T12:00:00+05:30',
                'bank_reference': '1234',
                'payment_group': 'upi',
            },
        },
    }).encode()


@override_settings(CASHFREE_CLIENT_ID='test-id', CASHFREE_CLIENT_SECRET=SECRET, SHIPPING_FEE_INR='0')
class StoreTestCase(TestCase):
    def checkout(self, items=None, **overrides):
        body = {**CUSTOMER, **overrides, 'items': items if items is not None else [{'sku': SKU, 'quantity': 2}]}
        return self.client.post('/api/checkout/', json.dumps(body), content_type='application/json')

    def make_order(self, quantity=1):
        with mock.patch.object(cashfree, 'create_order', return_value={'cf_order_id': 99, 'payment_session_id': 'session_x'}):
            resp = self.checkout(items=[{'sku': SKU, 'quantity': quantity}])
        return Order.objects.get(order_id=resp.json()['order_id'])

    def post_webhook(self, body, signature=None, timestamp='1700000000000'):
        return self.client.post(
            '/api/webhooks/cashfree/', body, content_type='application/json',
            headers={'x-webhook-timestamp': timestamp, 'x-webhook-signature': signature or sign(body, timestamp)},
        )


class ProductTests(StoreTestCase):
    def test_lists_seeded_product(self):
        products = self.client.get('/api/products/').json()['products']
        data = self.client.get('/api/products/').json()
        self.assertEqual(products, [{'sku': SKU, 'name': 'PCOS Harmony', 'flavour': 'Passion Fruit', 'sachets': 31, 'price': '1580.00'}])
        self.assertEqual((data['shipping_fee'], data['max_quantity']), ('0.00', 10))

    def test_hides_inactive_products(self):
        Product.objects.update(is_active=False)
        self.assertEqual(self.client.get('/api/products/').json()['products'], [])


class CheckoutTests(StoreTestCase):
    @mock.patch.object(cashfree, 'create_order', return_value={'cf_order_id': 123, 'payment_session_id': 'session_abc'})
    def test_creates_order_with_server_side_price(self, create_order):
        resp = self.checkout(items=[{'sku': SKU, 'quantity': 2, 'price': 1}])  # browser price is ignored

        self.assertEqual(resp.status_code, 201)
        data = resp.json()
        self.assertEqual(data['payment_session_id'], 'session_abc')
        self.assertEqual(data['amount'], '3160.00')
        order = Order.objects.get(order_id=data['order_id'])
        self.assertEqual(order.status, Order.Status.PENDING)
        self.assertEqual(order.phone, '9876543210')
        self.assertEqual(order.total, Decimal('3160.00'))
        self.assertEqual(order.items.get().quantity, 2)
        self.assertEqual(order.cf_order_id, '123')
        create_order.assert_called_once()

    @override_settings(SHIPPING_FEE_INR='99')
    @mock.patch.object(cashfree, 'create_order', return_value={'payment_session_id': 's'})
    def test_adds_shipping_fee(self, _):
        self.assertEqual(self.checkout(items=[{'sku': SKU, 'quantity': 1}]).json()['amount'], '1679.00')

    def test_merges_duplicate_skus_and_enforces_max_quantity(self):
        resp = self.checkout(items=[{'sku': SKU, 'quantity': 6}, {'sku': SKU, 'quantity': 5}])
        self.assertEqual(resp.status_code, 400)
        self.assertIn('at most 10', resp.json()['error'])

    def test_rejects_bad_input(self):
        cases = [
            ({'items': []}, 'Your bag is empty.'),
            ({'items': [{'sku': 'nope', 'quantity': 1}]}, 'nope is not available.'),
            ({'items': [{'sku': SKU, 'quantity': 0}]}, f'Invalid quantity for {SKU}.'),
            ({'phone': '12345'}, 'Please check your details.'),
            ({'pincode': '012345'}, 'Please check your details.'),
            ({'email': 'not-an-email'}, 'Please check your details.'),
        ]
        for overrides, message in cases:
            with self.subTest(overrides=overrides):
                items = overrides.pop('items', None)
                resp = self.checkout(items=items, **overrides)
                self.assertEqual(resp.status_code, 400)
                self.assertEqual(resp.json()['error'], message)
        self.assertFalse(Order.objects.exists())

    def test_rejects_non_json(self):
        resp = self.client.post('/api/checkout/', 'hello', content_type='application/json')
        self.assertEqual(resp.status_code, 400)

    @mock.patch.object(cashfree, 'create_order', side_effect=cashfree.CashfreeError('down'))
    def test_gateway_failure(self, _):
        resp = self.checkout()
        self.assertEqual(resp.status_code, 502)
        self.assertEqual(Order.objects.get().status, Order.Status.FAILED)


class WebhookTests(StoreTestCase):
    def test_success_marks_order_paid(self):
        order = self.make_order()
        resp = self.post_webhook(webhook_body(order.order_id))

        self.assertEqual(resp.status_code, 200)
        order.refresh_from_db()
        self.assertEqual(order.status, Order.Status.PAID)
        self.assertIsNotNone(order.paid_at)
        payment = order.payments.get()
        self.assertEqual((payment.cf_payment_id, payment.status, payment.amount), ('5114910498', 'SUCCESS', Decimal('1580.00')))
        self.assertTrue(WebhookEvent.objects.get().signature_valid)

    def test_replay_is_idempotent(self):
        order = self.make_order()
        body = webhook_body(order.order_id)
        self.post_webhook(body)
        order.refresh_from_db()
        paid_at = order.paid_at
        self.post_webhook(body)

        order.refresh_from_db()
        self.assertEqual(order.paid_at, paid_at)
        self.assertEqual(Payment.objects.count(), 1)

    def test_invalid_signature_rejected(self):
        order = self.make_order()
        resp = self.post_webhook(webhook_body(order.order_id), signature=sign(b'other body'))

        self.assertEqual(resp.status_code, 400)
        order.refresh_from_db()
        self.assertEqual(order.status, Order.Status.PENDING)
        self.assertFalse(Payment.objects.exists())
        self.assertFalse(WebhookEvent.objects.get().signature_valid)

    def test_missing_signature_rejected(self):
        order = self.make_order()
        resp = self.client.post('/api/webhooks/cashfree/', webhook_body(order.order_id), content_type='application/json')
        self.assertEqual(resp.status_code, 400)

    def test_amount_mismatch_not_marked_paid(self):
        order = self.make_order()
        self.post_webhook(webhook_body(order.order_id, amount=1.0))
        order.refresh_from_db()
        self.assertEqual(order.status, Order.Status.PENDING)

    def test_failed_payment_keeps_order_open_for_retry(self):
        order = self.make_order()
        self.post_webhook(webhook_body(order.order_id, status='FAILED'))
        order.refresh_from_db()
        self.assertEqual(order.status, Order.Status.PENDING)
        self.assertEqual(order.payments.get().status, 'FAILED')

    def test_failed_after_success_does_not_unpay(self):
        order = self.make_order()
        self.post_webhook(webhook_body(order.order_id))
        self.post_webhook(webhook_body(order.order_id, status='FAILED', cf_payment_id=2))
        order.refresh_from_db()
        self.assertEqual(order.status, Order.Status.PAID)

    def test_unknown_order_acknowledged(self):
        resp = self.post_webhook(webhook_body('TRM-NOPE'))
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(WebhookEvent.objects.get().error, 'Unknown order')


class OrderStatusTests(StoreTestCase):
    def test_syncs_pending_order_from_cashfree(self):
        order = self.make_order()
        payments = [{'cf_payment_id': '77', 'payment_status': 'SUCCESS', 'payment_amount': 1580, 'payment_group': 'upi'}]
        with mock.patch.object(cashfree, 'fetch_order', return_value={'order_status': 'PAID', 'order_amount': 1580}), \
                mock.patch.object(cashfree, 'fetch_payments', return_value=payments):
            data = self.client.get(f'/api/orders/{order.order_id}/').json()

        self.assertEqual(data['status'], 'PAID')
        self.assertEqual(data['payment'], {'status': 'SUCCESS', 'message': ''})
        self.assertIsNone(data['payment_session_id'])
        self.assertNotIn('email', json.dumps(data))  # no personal data in this response

    def test_pending_order_returns_session_for_retry(self):
        order = self.make_order()
        with mock.patch.object(cashfree, 'fetch_order', return_value={'order_status': 'ACTIVE'}), \
                mock.patch.object(cashfree, 'fetch_payments', return_value=[]):
            data = self.client.get(f'/api/orders/{order.order_id}/').json()
        self.assertEqual(data['status'], 'PENDING')
        self.assertEqual(data['payment_session_id'], 'session_x')

    def test_expired_at_cashfree(self):
        order = self.make_order()
        with mock.patch.object(cashfree, 'fetch_order', return_value={'order_status': 'EXPIRED'}), \
                mock.patch.object(cashfree, 'fetch_payments', return_value=[]):
            data = self.client.get(f'/api/orders/{order.order_id}/').json()
        self.assertEqual(data['status'], 'EXPIRED')

    def test_cashfree_down_returns_last_known_status(self):
        order = self.make_order()
        with mock.patch.object(cashfree, 'fetch_order', side_effect=cashfree.CashfreeError('down')):
            resp = self.client.get(f'/api/orders/{order.order_id}/')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json()['status'], 'PENDING')

    def test_unknown_order_404(self):
        self.assertEqual(self.client.get('/api/orders/TRM-NOPE/').status_code, 404)


class CashfreeClientTests(StoreTestCase):
    def test_signature_verification(self):
        body = b'{"a": 1}'
        self.assertTrue(cashfree.verify_webhook_signature(body, '123', sign(body, '123')))
        self.assertFalse(cashfree.verify_webhook_signature(body, '124', sign(body, '123')))
        self.assertFalse(cashfree.verify_webhook_signature(body, '', ''))

    @override_settings(CASHFREE_ENV='sandbox', CASHFREE_API_VERSION='2026-01-01',
                       CHECKOUT_RETURN_URL='https://shop.test/?order_id={order_id}',
                       BACKEND_PUBLIC_URL='https://api.shop.test')
    def test_create_order_request(self):
        order = self.make_order()
        resp = mock.Mock(status_code=200, json=lambda: {'payment_session_id': 's'})
        with mock.patch('store.cashfree.requests.request', return_value=resp) as request:
            cashfree.create_order(order)

        method, url = request.call_args.args
        kwargs = request.call_args.kwargs
        self.assertEqual((method, url), ('POST', 'https://sandbox.cashfree.com/pg/orders'))
        self.assertEqual(kwargs['headers']['x-api-version'], '2026-01-01')
        self.assertEqual(kwargs['headers']['x-client-secret'], SECRET)
        payload = kwargs['json']
        self.assertEqual(payload['order_id'], order.order_id)
        self.assertEqual(payload['order_amount'], 1580.0)
        self.assertEqual(payload['customer_details']['customer_phone'], '9876543210')
        self.assertEqual(payload['order_meta'], {
            'return_url': f'https://shop.test/?order_id={order.order_id}',
            'notify_url': 'https://api.shop.test/api/webhooks/cashfree/',
        })

    def test_missing_credentials(self):
        with override_settings(CASHFREE_CLIENT_ID=''), self.assertRaises(cashfree.CashfreeError):
            cashfree.fetch_order('x')


@override_settings(ORDER_NOTIFY_EMAILS=['owner@example.com'], SUPPORT_EMAIL='help@example.com')
class ConfirmationEmailTests(StoreTestCase):
    def pay(self, order, **kwargs):
        with self.captureOnCommitCallbacks(execute=True):
            self.post_webhook(webhook_body(order.order_id, **kwargs))

    def test_paid_order_emails_customer_and_store(self):
        order = self.make_order(quantity=2)
        self.pay(order, amount=3160.0)

        customer, owner = mail.outbox
        self.assertEqual(customer.to, ['ananya@example.com'])
        self.assertEqual(customer.reply_to, ['help@example.com'])
        self.assertEqual(customer.subject, f'Your order {order.order_id} is confirmed')
        self.assertIn('2 × PCOS Harmony (Passion Fruit) — ₹3160.00', customer.body)
        self.assertIn('Bengaluru, Karnataka 560001', customer.body)
        html = customer.alternatives[0].content
        self.assertIn('Thank you, Ananya Rao.', html)
        self.assertEqual(owner.to, ['owner@example.com'])
        self.assertIn('Phone: 9876543210', owner.body)
        order.refresh_from_db()
        self.assertIsNotNone(order.confirmation_sent_at)

    def test_sent_once_even_if_webhook_repeats_or_status_is_polled(self):
        order = self.make_order()
        self.pay(order)
        self.pay(order)
        with self.captureOnCommitCallbacks(execute=True):
            emails.send_order_confirmation(order.pk)
        self.assertEqual(len([m for m in mail.outbox if m.to == ['ananya@example.com']]), 1)

    def test_no_email_for_unpaid_order(self):
        order = self.make_order()
        self.pay(order, status='FAILED')
        self.pay(order, amount=1.0)
        self.assertEqual(mail.outbox, [])
        self.assertFalse(emails.send_order_confirmation(order.pk))

    def test_mail_failure_does_not_break_webhook_and_can_be_retried(self):
        order = self.make_order()
        with mock.patch('store.emails.EmailMultiAlternatives.send', side_effect=OSError('smtp down')):
            with self.captureOnCommitCallbacks(execute=True):
                resp = self.post_webhook(webhook_body(order.order_id))
        self.assertEqual(resp.status_code, 200)
        order.refresh_from_db()
        self.assertEqual(order.status, Order.Status.PAID)
        self.assertIsNone(order.confirmation_sent_at)

        self.assertTrue(emails.send_order_confirmation(order.pk))
        self.assertEqual(mail.outbox[0].to, ['ananya@example.com'])

    def test_force_resend(self):
        order = self.make_order()
        self.pay(order)
        self.assertTrue(emails.send_order_confirmation(order.pk, force=True))
        self.assertEqual(len([m for m in mail.outbox if m.to == ['ananya@example.com']]), 2)

    def test_html_escapes_customer_input(self):
        order = self.make_order()
        Order.objects.filter(pk=order.pk).update(customer_name='<b>Eve</b>')
        self.pay(order)
        self.assertIn('&lt;b&gt;Eve&lt;/b&gt;', mail.outbox[0].alternatives[0].content)


class WaitlistTests(StoreTestCase):
    def join(self, **body):
        return self.client.post('/api/waitlist/', json.dumps(body), content_type='application/json')

    def test_join_and_rejoin_returns_same_number(self):
        first = self.join(name='Ananya', email='Ananya@Example.com', source='test', answers=[{'q': 'x', 'a': ['y']}])
        second = self.join(name='Ananya R', email='ananya@example.com')
        other = self.join(name='Meera', email='meera@example.com', source='mobile')

        self.assertEqual(first.status_code, 200)
        self.assertEqual(first.json(), second.json())
        self.assertEqual(other.json()['memberNumber'], first.json()['memberNumber'] + 1)
        entry = WaitlistEntry.objects.get(email='ananya@example.com')
        self.assertEqual((entry.source, entry.name), ('test', 'Ananya'))

    def test_validation(self):
        self.assertEqual(self.join(name='A', email='a@b.co').status_code, 400)
        self.assertEqual(self.join(name='Ann', email='nope').status_code, 400)
