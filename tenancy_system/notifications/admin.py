from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('title', 'tenant', 'notification_type', 'created_at', 'is_read')
    list_filter = ('notification_type', 'is_read')
    search_fields = ('title', 'tenant__user__username')

    # This makes the message field easier to write in
    fieldsets = (
        (None, {
            'fields': ('title', 'message', 'notification_type', 'tenant')
        }),
    )