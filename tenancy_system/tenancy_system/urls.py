from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import UserViewSet
from tenants.views import TenantViewSet, TenantRegistrationViewSet
from properties.views import PropertyViewSet

router = DefaultRouter()
router.register(r'tenants', TenantViewSet, basename='tenant')
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'auth/users', UserViewSet, basename='user')
router.register(r'tenant-register', TenantRegistrationViewSet, basename='tenant-register')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # includes tenants, properties, etc.
    path('api/auth/', include('accounts.urls')),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ✅ Add these two lines:
    path('api/payments/', include('payments.urls')),  # payment endpoints
    #path('api/notifications/', include('notifications.urls')),  # notification endpoints

    path('reports/', include('reports.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
