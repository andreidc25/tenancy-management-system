from django.urls import path
from .views import PaymentHistoryAPIView # Import your new view

urlpatterns = [
    path('api/history/', PaymentHistoryAPIView.as_view(), name='api_payment_history'),
]