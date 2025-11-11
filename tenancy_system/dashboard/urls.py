from django.urls import path
from . import views

urlpatterns = [
    path('admin-dashboard-stats/', views.admin_dashboard_stats, name='admin_dashboard_stats'),
    path('admin-dashboard-stats/', views.admin_dashboard_stats, name='admin_dashboard_stats'),
    path('recent-tenants/', views.recent_tenants, name='recent_tenants'),
    path('upcoming-leases/', views.upcoming_leases, name='upcoming_leases'),
    path('rent-collection-summary/', views.rent_collection_summary, name='rent_collection_summary'),
    path('tenant-summary/', views.tenant_dashboard_summary, name='tenant_dashboard_summary'),
    path('tenant-reports/', views.tenant_reports, name='tenant_reports'),
    path('tenant-property/', views.tenant_property_overview, name='tenant_property_overview'),


]

