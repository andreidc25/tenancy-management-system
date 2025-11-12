from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.user.username', read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'title', 'message', 'status', 'image', 'created_at', 'tenant_name']
        read_only_fields = ['created_at']
