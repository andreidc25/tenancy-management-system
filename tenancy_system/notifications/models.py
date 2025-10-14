from django.db import models
from tenants.models import TenantProfile

class Notification(models.Model):
    class NotificationType(models.TextChoices):
        ANNOUNCEMENT = 'ANNOUNCE', 'Announcement'
        PAYMENT_REMINDER = 'PAYMENT', 'Payment Reminder'
        MAINTENANCE = 'MAINT', 'Maintenance'

    # If tenant is blank, it's a broadcast to everyone.
    # Otherwise, it's a private notification.
    tenant = models.ForeignKey(TenantProfile, on_delete=models.CASCADE, null=True, blank=True, related_name='notifications')

    title = models.CharField(max_length=255)
    message = models.TextField()

    notification_type = models.CharField(
        max_length=10, 
        choices=NotificationType.choices, 
        default=NotificationType.ANNOUNCEMENT
    )

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        target = self.tenant.user.username if self.tenant else "All Tenants"
        return f"'{self.title}' for {target}"