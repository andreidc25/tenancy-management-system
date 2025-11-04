from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.submit_report, name='submit_report'),
    path('all/', views.get_all_reports, name='get_all_reports'),  # 👈 New API route
]
