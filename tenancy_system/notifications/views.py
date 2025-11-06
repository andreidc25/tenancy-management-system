# notifications/views.py
from rest_framework import viewsets, permissions
from .models import Notification
from .serializers import NotificationSerializer
from tenants.models import TenantProfile

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all().order_by('-created_at')
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            # Admin sees all notifications
            return Notification.objects.all().order_by('-created_at')
        tenant = TenantProfile.objects.filter(user=user).first()
        return Notification.objects.filter(tenant=tenant) | Notification.objects.filter(tenant=None)

    def perform_create(self, serializer):
        user = self.request.user
        if not user.is_staff:
            raise permissions.PermissionDenied("Only admins can create notifications.")
        serializer.save()
