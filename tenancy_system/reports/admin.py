from django.contrib import admin
from .models import Report

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'tenant', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('title', 'tenant__user__username', 'message')
    readonly_fields = ('created_at',)