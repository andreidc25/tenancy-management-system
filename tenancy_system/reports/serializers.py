from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    tenant = serializers.CharField(source='tenant.user.username', read_only=True)
    created_at = serializers.DateTimeField(format="%b %d, %Y, %I:%M %p")

    class Meta:
        model = Report
        fields = ['id', 'title', 'tenant', 'status', 'created_at']
