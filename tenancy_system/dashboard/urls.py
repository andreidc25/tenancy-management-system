from django.urls import path
from . import views

urlpatterns = [
    path('admin-dashboard-stats/', views.admin_dashboard_stats, name='admin_dashboard_stats'),
    path('admin-dashboard-stats/', views.admin_dashboard_stats, name='admin_dashboard_stats'),
    path('recent-tenants/', views.recent_tenants, name='recent_tenants'),
    path('upcoming-leases/', views.upcoming_leases, name='upcoming_leases'),
    path('rent-collection-summary/', views.rent_collection_summary, name='rent_collection_summary'),
]

