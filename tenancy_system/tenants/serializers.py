from rest_framework import serializers
from .models import TenantProfile

class TenantProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', required=False)
    full_name = serializers.SerializerMethodField()
    property = serializers.SerializerMethodField()

    class Meta:
        model = TenantProfile
        fields = [
            'id', 'username', 'email', 'full_name', 'phone_number',
            'property', 'lease_start_date', 'lease_end_date',
            'monthly_rent', 'security_deposit', 'is_active'
        ]
        read_only_fields = ['username', 'property']

    # ✅ Compute full_name dynamically
    def get_full_name(self, obj):
        first = obj.user.first_name or ""
        last = obj.user.last_name or ""
        return f"{first} {last}".strip() or obj.user.username

    def update(self, instance, validated_data):
        """Update both User and TenantProfile fields"""
        user_data = validated_data.pop('user', {})
        user = instance.user

        # ✅ Update full_name if provided
        full_name = self.context['request'].data.get('full_name')
        if full_name:
            parts = full_name.strip().split(" ", 1)
            user.first_name = parts[0]
            user.last_name = parts[1] if len(parts) > 1 else ""

        # ✅ Update email
        if 'email' in user_data:
            user.email = user_data['email']
        elif 'email' in self.context['request'].data:
            user.email = self.context['request'].data.get('email')

        user.save()
        return super().update(instance, validated_data)

    def get_property(self, obj):
        return str(obj.property) if obj.property else None
