from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import TenantProfile

# --- This part manages the Tenant Profile form on the User page ---
class TenantProfileInline(admin.StackedInline):
    model = TenantProfile
    can_delete = False
    verbose_name_plural = 'Tenant Profile'

class UserAdmin(BaseUserAdmin):
    inlines = (TenantProfileInline,)

# --- This class manages the "Tenant profiles" list page ---
@admin.register(TenantProfile)
class TenantProfileAdmin(admin.ModelAdmin):
    list_display = (
        'get_full_name',
        'phone_number',
        'property',
        'lease_start_date',
        'monthly_rent',
        'security_deposit',
        'lease_end_date',
        'is_active',
    )
    list_filter = ('property', 'is_active')
    search_fields = ('user__username', 'user__first_name', 'user__last_name', 'phone_number')

    @admin.display(description='Full Name', ordering='user__first_name')
    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

# --- Re-register the User admin with the inline ---
admin.site.unregister(User)
admin.site.register(User, UserAdmin)