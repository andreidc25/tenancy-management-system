from rest_framework import viewsets, status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all().select_related('tenant__user')
    serializer_class = PaymentSerializer

    def get_permissions(self):
        # Admins can view/update all; tenants can only view their own
        if self.action in ['list', 'retrieve', 'partial_update']:
            return [IsAuthenticated()]
        return [IsAdminUser()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:  # Admins see all payments
            return Payment.objects.all().select_related('tenant__user')
        # Tenants see only their own payments
        return Payment.objects.filter(tenant__user=user).select_related('tenant__user')

    def partial_update(self, request, *args, **kwargs):
        """Handles PATCH requests for acknowledging payments"""
        payment = self.get_object()
        serializer = self.get_serializer(payment, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
