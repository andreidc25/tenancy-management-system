from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PaymentViewSet, tenant_balance, tenant_payment_history

router = DefaultRouter()
router.register(r'', PaymentViewSet, basename='payments')

urlpatterns = [
    path('tenant/history/', tenant_payment_history, name='tenant_payment_history'),  # ✅ matches frontend
    path('tenant/<int:tenant_id>/balance/', tenant_balance, name='tenant_balance'),
]

urlpatterns += router.urls
