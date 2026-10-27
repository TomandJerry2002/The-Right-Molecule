import csv

from django.contrib import admin, messages
from django.http import HttpResponse
from django.utils import timezone

from . import cashfree, emails, services
from .models import Order, OrderItem, Payment, Product, WaitlistEntry, WebhookEvent


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['sku', 'name', 'flavour', 'sachets', 'price', 'is_active']
    list_editable = ['price', 'is_active']


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    can_delete = False
    fields = ['product_name', 'flavour', 'unit_price', 'quantity', 'line_total']
    readonly_fields = fields

    def has_add_permission(self, request, obj=None):
        return False


class PaymentInline(admin.TabularInline):
    model = Payment
    extra = 0
    can_delete = False
    fields = ['cf_payment_id', 'status', 'amount', 'payment_group', 'message', 'bank_reference', 'payment_time']
    readonly_fields = fields

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'created_at', 'customer_name', 'phone', 'city', 'total', 'status', 'fulfilment_status']
    list_filter = ['status', 'fulfilment_status', 'created_at']
    search_fields = ['order_id', 'customer_name', 'email', 'phone', 'cf_order_id', 'tracking_number']
    date_hierarchy = 'created_at'
    inlines = [OrderItemInline, PaymentInline]
    actions = ['refresh_from_cashfree', 'mark_shipped', 'resend_confirmation']
    readonly_fields = [
        'order_id', 'status', 'subtotal', 'shipping_fee', 'total',
        'cf_order_id', 'payment_session_id', 'paid_at', 'confirmation_sent_at', 'created_at', 'updated_at',
    ]
    fieldsets = [
        ('Order', {'fields': ['order_id', 'status', 'created_at', 'paid_at', 'confirmation_sent_at']}),
        ('Customer', {'fields': ['customer_name', 'email', 'phone']}),
        ('Ship to', {'fields': ['address_line1', 'address_line2', 'city', 'state', 'pincode']}),
        ('Amount (₹)', {'fields': ['subtotal', 'shipping_fee', 'total']}),
        ('Fulfilment', {'fields': ['fulfilment_status', 'courier', 'tracking_number', 'shipped_at', 'notes']}),
        ('Cashfree', {'classes': ['collapse'], 'fields': ['cf_order_id', 'payment_session_id', 'updated_at']}),
    ]

    @admin.action(description='Refresh payment status from Cashfree')
    def refresh_from_cashfree(self, request, queryset):
        for order in queryset:
            try:
                services.sync_order(order)
            except cashfree.CashfreeError as exc:
                self.message_user(request, f'{order.order_id}: {exc}', messages.ERROR)
        self.message_user(request, 'Refreshed from Cashfree.')

    @admin.action(description='Mark as shipped')
    def mark_shipped(self, request, queryset):
        unpaid = queryset.exclude(status=Order.Status.PAID).count()
        if unpaid:
            self.message_user(request, f'{unpaid} selected order(s) are not paid. Nothing was changed.', messages.ERROR)
            return
        updated = queryset.update(fulfilment_status=Order.Fulfilment.SHIPPED, shipped_at=timezone.now())
        self.message_user(request, f'{updated} order(s) marked as shipped. Add tracking numbers on each order.')

    @admin.action(description='Resend order confirmation email')
    def resend_confirmation(self, request, queryset):
        sent = sum(emails.send_order_confirmation(order.pk, force=True) for order in queryset.filter(status=Order.Status.PAID))
        skipped = queryset.count() - sent
        self.message_user(request, f'Sent {sent} confirmation email(s).' + (f' {skipped} skipped (not paid, or sending failed — see logs).' if skipped else ''),
                          messages.WARNING if skipped else messages.SUCCESS)


@admin.register(WebhookEvent)
class WebhookEventAdmin(admin.ModelAdmin):
    list_display = ['received_at', 'event_type', 'order_id', 'signature_valid', 'error']
    list_filter = ['event_type', 'signature_valid']
    search_fields = ['order_id']
    readonly_fields = ['received_at', 'event_type', 'order_id', 'signature_valid', 'body', 'error']

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(WaitlistEntry)
class WaitlistEntryAdmin(admin.ModelAdmin):
    list_display = ['member_number', 'name', 'email', 'source', 'created_at']
    list_filter = ['source']
    search_fields = ['name', 'email']
    readonly_fields = ['answers', 'created_at']
    actions = ['export_csv']

    @admin.action(description='Export selected to CSV')
    def export_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="waitlist.csv"'
        writer = csv.writer(response)
        writer.writerow(['member_number', 'name', 'email', 'source', 'joined'])
        for e in queryset:
            writer.writerow([e.member_number, _csv_safe(e.name), _csv_safe(e.email), e.source, e.created_at.isoformat()])
        return response


def _csv_safe(value):
    # Stop spreadsheet apps from running user-entered text as a formula.
    return "'" + value if value[:1] in ('=', '+', '-', '@') else value
