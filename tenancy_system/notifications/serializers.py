from rest_framework import serializers
from .models import Notification
from tenants.models import TenantProfile

class NotificationSerializer(serializers.ModelSerializer):
    tenant_username = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            'id', 'tenant', 'tenant_username',
            'title', 'message',
            'notification_type', 'is_read', 'created_at'
        ]

    def get_tenant_username(self, obj):
        return obj.tenant.user.username if obj.tenant else "All Tenants"
