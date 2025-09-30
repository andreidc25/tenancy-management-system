from django.contrib import admin
from .models import TenantProfile, Property

@admin.register(TenantProfile)
class TenantProfileAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "property_rented", "lease_expiry")

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("name", "address", )

