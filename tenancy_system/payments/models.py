from django.db import models
from django.utils import timezone
from tenants.models import TenantProfile


class Payment(models.Model):
    class PaymentMethod(models.TextChoices):
        CASH = 'CASH', 'Cash'
        BANK_TRANSFER = 'BANK', 'Bank Transfer'
        ONLINE = 'ONLINE', 'Online Payment'

    class PaymentStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        COMPLETED = 'COMPLETED', 'Completed'
        FAILED = 'FAILED', 'Failed'

    # Link to the tenant who made the payment
    tenant = models.ForeignKey(TenantProfile, on_delete=models.CASCADE, related_name='payments')

    # Payment details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(default=timezone.now)
    payment_method = models.CharField(max_length=10, choices=PaymentMethod.choices, default=PaymentMethod.BANK_TRANSFER)
    status = models.CharField(max_length=10, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    proof = models.ImageField(upload_to='payment_proofs/', null=True, blank=True)


    # Optional field for reference numbers or notes
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Payment of {self.amount} by {self.tenant.user.username} on {self.payment_date}"