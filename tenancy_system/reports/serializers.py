from rest_framework import serializers
from .models import Report

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'title', 'message', 'status', 'image', 'created_at']
        read_only_fields = ['created_at']
