# notifications/urls.py
from django.urls import path
from .views import NotificationListCreateAPIView

urlpatterns = [
    path('', NotificationListCreateAPIView.as_view(), name='notification_list_create'),
]