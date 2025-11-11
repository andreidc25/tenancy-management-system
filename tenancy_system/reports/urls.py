from django.urls import path
from . import views

urlpatterns = [
    path('tenant/', views.get_tenant_reports, name='get_tenant_reports'),
    path('tenant/add/', views.create_tenant_report, name='create_tenant_report'),
    path('tenant/<int:report_id>/', views.get_tenant_report_detail, name='get_tenant_report_detail'),  # ✅ NEW
    path('all/', views.get_all_reports, name='get_all_reports'),
    path('submit/', views.submit_report, name='submit_report'),
    path('<int:pk>/', views.get_report_detail, name='get_report_detail'),
    path('<int:pk>/update-status/', views.update_report_status, name='update_report_status'),
    
]
