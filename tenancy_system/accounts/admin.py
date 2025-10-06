from django.contrib import admin
from tenants.models import TenantProfile



@admin.register(TenantProfile)
class TenantProfileAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "property_rented", "lease_expiry")



