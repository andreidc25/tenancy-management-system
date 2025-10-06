from django.db import models
from django.contrib.auth.models import User
from properties.models import Property

class TenantProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    birthday = models.DateField(blank=True, null=True)
    property_rented = models.ForeignKey(Property, on_delete=models.SET_NULL, blank=True, null=True)
    lease_expiry = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s profile"


