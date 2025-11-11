from django.urls import path
from . import views

urlpatterns = [
    path('tenant/add/', views.create_tenant_report, name='create_tenant_report'),
    path('tenant/', views.get_tenant_reports, name='get_tenant_reports'),
    path('all/', views.get_all_reports, name='get_all_reports'),
    path('submit/', views.submit_report, name='submit_report'),
]
