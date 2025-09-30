from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class TenantProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    lease_expiry = models.DateField()
    property_rented = models.CharField(max_length=200)

    # optional fields tenant can fill up after magawa acc
    birthday = models.DateField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.property_rented}"

class Property(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True, null=True)
    # expand this sht later (e.g., monthly_rent, availability status, etc.)

    def __str__(self):
        return self.name