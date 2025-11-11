from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from tenants.models import TenantProfile
from properties.models import Property
from datetime import date
from django.db.models import Q

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard_stats(request):
    """Return overall admin dashboard statistics."""
    total_properties = Property.objects.count()
    total_tenants = TenantProfile.objects.count()

    occupancy_rate = 0
    if total_properties > 0:
        occupancy_rate = round((total_tenants / total_properties) * 100, 2)

    # Count maintenance requests (if you have such a model)
    maintenance_requests = 0
    try:
        from maintenance.models import MaintenanceRequest
        maintenance_requests = MaintenanceRequest.objects.filter(
            Q(status='Pending') | Q(status='In Progress')
        ).count()
    except:
        pass

    # Example of new tenants this month
    new_tenants_this_month = TenantProfile.objects.filter(
        created_at__month=date.today().month
    ).count()

    data = {
        "total_properties": total_properties,
        "total_tenants": total_tenants,
        "occupancy_rate": f"{occupancy_rate}%",
        "maintenance_requests": maintenance_requests,
        "new_tenants_this_month": new_tenants_this_month,
    }
    return Response(data)
