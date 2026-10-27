import secrets

from django.db import models
from django.utils import timezone


class Product(models.Model):
    sku = models.SlugField(max_length=64, unique=True, help_text='Stable ID the website sends at checkout.')
    name = models.CharField(max_length=120)
    flavour = models.CharField(max_length=60, blank=True)
    sachets = models.PositiveSmallIntegerField(default=31, help_text='Sachets per pack.')
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text='INR per pack, inclusive of GST.')
    is_active = models.BooleanField(default=True, help_text='Untick to stop selling this product.')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name', 'flavour']

    def __str__(self):
        return f'{self.name} – {self.flavour}' if self.flavour else self.name


def generate_order_id():
    # Cashfree allows [A-Za-z0-9_-], max 45 chars. The random part keeps IDs unguessable.
    return f"TRM-{timezone.localdate():%y%m%d}-{secrets.token_hex(6).upper()}"


class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Awaiting payment'
        PAID = 'PAID', 'Paid'
        EXPIRED = 'EXPIRED', 'Expired / terminated'
        FAILED = 'FAILED', 'Gateway error'
        CANCELLED = 'CANCELLED', 'Cancelled'

    class Fulfilment(models.TextChoices):
        UNFULFILLED = 'UNFULFILLED', 'Unfulfilled'
        PACKED = 'PACKED', 'Packed'
        SHIPPED = 'SHIPPED', 'Shipped'
        DELIVERED = 'DELIVERED', 'Delivered'
        RETURNED = 'RETURNED', 'Returned'

    order_id = models.CharField(max_length=45, unique=True, default=generate_order_id, editable=False)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.PENDING, db_index=True)

    # Customer (guest checkout)
    customer_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10, help_text='10-digit Indian mobile number.')

    # Shipping address
    address_line1 = models.CharField(max_length=200)
    address_line2 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=80)
    state = models.CharField(max_length=80)
    pincode = models.CharField(max_length=6)

    # Money (INR). Always computed on the server from Product prices.
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    # Cashfree
    cf_order_id = models.CharField(max_length=64, blank=True)
    payment_session_id = models.CharField(max_length=255, blank=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    confirmation_sent_at = models.DateTimeField(null=True, blank=True)

    # Fulfilment
    fulfilment_status = models.CharField(max_length=12, choices=Fulfilment.choices, default=Fulfilment.UNFULFILLED)
    courier = models.CharField(max_length=60, blank=True)
    tracking_number = models.CharField(max_length=100, blank=True)
    shipped_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True, help_text='Internal notes, never shown to the customer.')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.order_id


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    # Snapshots, so past orders don't change when a product is edited.
    product_name = models.CharField(max_length=120)
    flavour = models.CharField(max_length=60, blank=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveSmallIntegerField()

    @property
    def line_total(self):
        return self.unit_price * self.quantity

    def __str__(self):
        return f'{self.quantity} × {self.product_name}'


class Payment(models.Model):
    """One payment attempt on an order, as reported by Cashfree."""

    order = models.ForeignKey(Order, related_name='payments', on_delete=models.CASCADE)
    cf_payment_id = models.CharField(max_length=64, unique=True)
    status = models.CharField(max_length=20)  # SUCCESS, FAILED, USER_DROPPED, PENDING, ...
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_group = models.CharField(max_length=40, blank=True)  # upi, credit_card, net_banking, ...
    message = models.CharField(max_length=255, blank=True)
    bank_reference = models.CharField(max_length=100, blank=True)
    payment_time = models.DateTimeField(null=True, blank=True)
    raw = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.cf_payment_id} ({self.status})'


class WebhookEvent(models.Model):
    """Every webhook Cashfree sends, kept for auditing and debugging."""

    event_type = models.CharField(max_length=60, blank=True)
    order_id = models.CharField(max_length=45, blank=True, db_index=True)
    signature_valid = models.BooleanField()
    body = models.TextField()
    error = models.TextField(blank=True)
    received_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-received_at']

    def __str__(self):
        return f'{self.event_type or "unknown"} {self.order_id}'


class WaitlistEntry(models.Model):
    class Source(models.TextChoices):
        WAITLIST = 'waitlist', 'Waitlist pop-up'
        TEST = 'test', 'PCOS test'
        MOBILE = 'mobile', 'Mobile site'

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    source = models.CharField(max_length=10, choices=Source.choices, default=Source.WAITLIST)
    answers = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']
        verbose_name_plural = 'waitlist entries'

    @property
    def member_number(self):
        return self.pk

    def __str__(self):
        return f'#{self.pk:04d} {self.email}'
