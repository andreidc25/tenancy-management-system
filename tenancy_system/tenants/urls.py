from django.urls import path
from .views import tenant_balance
from .views import get_tenant_profile

urlpatterns = [
    path('balance/<int:tenant_id>/', tenant_balance, name='tenant-balance'),
    path("profile/me/", get_tenant_profile, name="get_tenant_profile"),
]
