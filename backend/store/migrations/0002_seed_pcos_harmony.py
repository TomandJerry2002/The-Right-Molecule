# Seeds the launch product, matching PRODUCT in src/Site.jsx. Edit the price in admin.

from decimal import Decimal

from django.db import migrations


def seed(apps, schema_editor):
    Product = apps.get_model('store', 'Product')
    Product.objects.get_or_create(
        sku='pcos-harmony-passion-fruit',
        defaults={'name': 'PCOS Harmony', 'flavour': 'Passion Fruit', 'sachets': 31, 'price': Decimal('1580.00')},
    )


def unseed(apps, schema_editor):
    apps.get_model('store', 'Product').objects.filter(sku='pcos-harmony-passion-fruit').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
