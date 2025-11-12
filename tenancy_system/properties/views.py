from rest_framework import viewsets, permissions
from .models import Property
from .serializers import PropertySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('-date_added')
    serializer_class = PropertySerializer
    permission_classes = [permissions.AllowAny]  # Change to IsAuthenticated once login works
