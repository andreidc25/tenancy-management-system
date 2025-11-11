from rest_framework import viewsets, status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Sum
from datetime import date

from .models import Payment                # ✅ use local import
from tenants.models import TenantProfile   # ✅ correct model import
from .serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().select_related('tenant__user')
    serializer_class = PaymentSerializer

    def get_permissions(self):
        # Admins can view/update all; tenants can only view their own
        if self.action in ['list', 'retrieve', 'create', 'partial_update']:
            return [IsAuthenticated()]
        return [IsAdminUser()]

    def get_queryset(self):
        user = self.request.user
        queryset = Payment.objects.all().select_related('tenant__user')

        if user.is_staff:
            tenant_id = self.request.query_params.get('tenant_id')
            if tenant_id:
                queryset = queryset.filter(tenant__id=tenant_id)
            return queryset

        # For tenants: filter payments linked to their tenant profile
        return queryset.filter(tenant__user_id=user.id)


    def partial_update(self, request, *args, **kwargs):
        """Handles PATCH requests for acknowledging payments"""
        payment = self.get_object()
        serializer = self.get_serializer(payment, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tenant_balance(request, tenant_id):
    try:
        tenant = TenantProfile.objects.get(user_id=tenant_id)
    except TenantProfile.DoesNotExist:
        return Response({'error': 'Tenant not found'}, status=404)

    today = date.today()
    lease_end = tenant.lease_end_date
    lease_start = tenant.lease_start_date

    # Count how many months of rent should have been paid so far
    months_due = (
        (min(today, lease_end).year - lease_start.year) * 12 +
        (min(today, lease_end).month - lease_start.month) + 1
    )
    if months_due < 0:
        months_due = 0

    total_due = tenant.monthly_rent * months_due

    # Total paid so far (only completed payments)
    total_paid = Payment.objects.filter(
        tenant=tenant,
        status='COMPLETED'
    ).aggregate(total=Sum('amount'))['total'] or 0

    remaining_balance = max(total_due - total_paid, 0)
    overdue = today > lease_end and remaining_balance > 0

    return Response({
        'tenant': tenant.user.username,
        'monthly_rent': tenant.monthly_rent,
        'months_due': months_due,
        'total_due': total_due,
        'total_paid': total_paid,
        'balance': remaining_balance,
        'lease_end_date': lease_end,
        'overdue': overdue,
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tenant_payment_history(request):
    """Return recent payment history for the logged-in tenant."""
    tenant = TenantProfile.objects.filter(user=request.user).first()
    if not tenant:
        return Response({"error": "Tenant profile not found"}, status=404)

    payments = Payment.objects.filter(tenant=tenant).order_by('-payment_date')[:10]
    data = [
        {
            "id": p.id,
            "amount": float(p.amount),
            "status": p.status,
            "payment_date": p.payment_date,
            "method": p.payment_method,  # ✅ fixed field name
        }
        for p in payments
    ]
    return Response(data)