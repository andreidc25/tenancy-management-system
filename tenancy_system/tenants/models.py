from django.db import models
from django.conf import settings
from properties.models import Property

class TenantProfile(models.Model):
    # Link to the built-in User model for login
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tenant_profile')
    
    # You can get first/last name directly from the user model (e.g., user.first_name)
    # so these fields are not needed here.
    
    # Contact info
    phone_number = models.CharField(max_length=15, blank=True)
    
    # Link to the property they are renting
    property = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True, related_name='tenants')
    
    # Lease details (removed redundant lease_expiry)
    lease_start_date = models.DateField()
    lease_end_date = models.DateField()
    monthly_rent = models.DecimalField(max_digits=10, decimal_places=2)
    security_deposit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Status to know if the tenancy is active
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # This is a better way to get the name, falling back to username
        return self.user.get_full_name() or self.user.username