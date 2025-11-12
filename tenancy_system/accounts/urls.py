from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import CustomTokenObtainPairView
from . import views
from .views import whoami


app_name = 'accounts'

urlpatterns = [
    # Authentication endpoints for React frontend
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('whoami/', whoami, name='whoami'),



]