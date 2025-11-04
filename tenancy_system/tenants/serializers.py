from rest_framework import serializers
from .models import TenantProfile

class TenantProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = TenantProfile
        fields = [
            'id', 'username', 'email', 'full_name', 'phone_number',
            'property', 'lease_start_date', 'lease_end_date',
            'monthly_rent', 'security_deposit', 'is_active'
        ]

    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

