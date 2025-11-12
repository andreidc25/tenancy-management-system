from rest_framework import serializers
from .models import TenantProfile

class TenantProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', required=False)
    full_name = serializers.CharField(source='user.first_name', required=False)
    property = serializers.SerializerMethodField()

    class Meta:
        model = TenantProfile
        fields = [
            'id', 'username', 'email', 'full_name', 'phone_number',
            'property', 'lease_start_date', 'lease_end_date',
            'monthly_rent', 'security_deposit', 'is_active'
        ]
        read_only_fields = ['username', 'property']

    def update(self, instance, validated_data):
        """Update both User and TenantProfile fields"""
        user_data = validated_data.pop('user', {})
        user = instance.user

        # ✅ Update name and email
        if 'first_name' in user_data:
            user.first_name = user_data['first_name']
        if 'email' in user_data:
            user.email = user_data['email']
        user.save()

        # ✅ Update tenant-specific fields
        return super().update(instance, validated_data)

    def get_property(self, obj):
        return str(obj.property) if obj.property else None
