from django.urls import path

from . import views

urlpatterns = [
    path('products/', views.product_list, name='product-list'),
    path('checkout/', views.checkout, name='checkout'),
    path('orders/<str:order_id>/', views.order_status, name='order-status'),
    path('webhooks/cashfree/', views.cashfree_webhook, name='cashfree-webhook'),
    path('waitlist/', views.waitlist_join, name='waitlist'),
]
