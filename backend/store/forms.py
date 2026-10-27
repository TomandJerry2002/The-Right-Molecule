import re

from django import forms
from django.conf import settings

from .models import Product, WaitlistEntry


class CheckoutForm(forms.Form):
    customer_name = forms.CharField(min_length=3, max_length=100)
    email = forms.EmailField(max_length=100)
    phone = forms.CharField(max_length=20)
    address_line1 = forms.CharField(max_length=200)
    address_line2 = forms.CharField(max_length=200, required=False)
    city = forms.CharField(max_length=80)
    state = forms.CharField(max_length=80)
    pincode = forms.CharField(max_length=6)

    def clean_phone(self):
        # Accept "+91 98765 43210", "098765-43210", etc. and store the bare 10 digits.
        digits = re.sub(r'\D', '', self.cleaned_data['phone'])
        if len(digits) == 12 and digits.startswith('91'):
            digits = digits[2:]
        elif len(digits) == 11 and digits.startswith('0'):
            digits = digits[1:]
        if not re.fullmatch(r'[6-9]\d{9}', digits):
            raise forms.ValidationError('Enter a valid 10-digit Indian mobile number.')
        return digits

    def clean_pincode(self):
        pincode = self.cleaned_data['pincode'].strip()
        if not re.fullmatch(r'[1-9]\d{5}', pincode):
            raise forms.ValidationError('Enter a valid 6-digit PIN code.')
        return pincode


def clean_items(raw_items):
    """
    raw_items: [{"sku": "...", "quantity": 2}, ...] from the request.
    Returns [(Product, quantity), ...] or raises ValidationError. Prices come from the
    database only; anything price-like the browser sends is ignored.
    """
    if not isinstance(raw_items, list) or not raw_items:
        raise forms.ValidationError('Your bag is empty.')

    quantities = {}
    for item in raw_items:
        if not isinstance(item, dict):
            raise forms.ValidationError('Invalid item.')
        sku = str(item.get('sku', ''))
        try:
            qty = int(item.get('quantity', 0))
        except (TypeError, ValueError):
            raise forms.ValidationError(f'Invalid quantity for {sku}.')
        if qty < 1:
            raise forms.ValidationError(f'Invalid quantity for {sku}.')
        quantities[sku] = quantities.get(sku, 0) + qty

    products = {p.sku: p for p in Product.objects.filter(sku__in=quantities, is_active=True)}
    lines = []
    for sku, qty in quantities.items():
        if sku not in products:
            raise forms.ValidationError(f'{sku or "This product"} is not available.')
        if qty > settings.MAX_QTY_PER_ITEM:
            raise forms.ValidationError(f'You can order at most {settings.MAX_QTY_PER_ITEM} of each product.')
        lines.append((products[sku], qty))
    return lines


class WaitlistForm(forms.Form):
    name = forms.CharField(min_length=2, max_length=100)
    email = forms.EmailField(max_length=254)
    source = forms.ChoiceField(choices=WaitlistEntry.Source.choices, required=False)

    def clean_email(self):
        return self.cleaned_data['email'].strip().lower()
