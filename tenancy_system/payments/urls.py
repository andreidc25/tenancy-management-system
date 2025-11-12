from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
    PaymentViewSet,
    tenant_balance,
    tenant_payment_history,
    get_payment_detail,
    update_payment_status
)

router = DefaultRouter()
router.register(r'', PaymentViewSet, basename='payments')

urlpatterns = [
    # ✅ Tenant endpoints
    path('tenant/history/', tenant_payment_history, name='tenant_payment_history'),
    path('tenant/<int:tenant_id>/balance/', tenant_balance, name='tenant_balance'),

    # ✅ Admin endpoints
    path('admin/<int:pk>/', get_payment_detail),
path('admin/<int:pk>/update-status/', update_payment_status),
]

urlpatterns += router.urls
