# notifications/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from .serializers import NotificationSerializer
from tenants.models import TenantProfile


class NotificationListCreateAPIView(APIView):
    def get(self, request):
        # Get all notifications, or tenant-specific ones
        tenant = TenantProfile.objects.filter(user=request.user).first()
        notifications = Notification.objects.filter(tenant=tenant) | Notification.objects.filter(tenant=None)
        serializer = NotificationSerializer(notifications.order_by('-created_at'), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
