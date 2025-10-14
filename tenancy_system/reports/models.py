from django.db import models
from tenants.models import TenantProfile

class Report(models.Model):
    class ReportStatus(models.TextChoices):
        SUBMITTED = 'SUBMITTED', 'Submitted'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        RESOLVED = 'RESOLVED', 'Resolved'

    tenant = models.ForeignKey(TenantProfile, on_delete=models.CASCADE, related_name='reports')
    title = models.CharField(max_length=255)
    message = models.TextField()

    # Allows tenants to upload a picture (e.g., of a leak or damage)
    image = models.ImageField(upload_to='report_images/', blank=True, null=True)

    status = models.CharField(max_length=20, choices=ReportStatus.choices, default=ReportStatus.SUBMITTED)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report '{self.title}' from {self.tenant.user.username}"