from rest_framework import serializers
from .models import TenantNotification

class TenantNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TenantNotification
        fields = ['tenant', 'title', 'message', 'created_at']
