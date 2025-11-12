from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    tenant_name = serializers.SerializerMethodField()
    tenant_id = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = [
            'id',
            'tenant',
            'tenant_name',
            'tenant_id',
            'amount',
            'payment_date',
            'payment_method',
            'status',
            'notes',
            'proof',
        ]

    def get_tenant_name(self, obj):
        return obj.tenant.full_name if hasattr(obj.tenant, 'full_name') else obj.tenant.user.username

    def get_tenant_id(self, obj):
        return obj.tenant.id
