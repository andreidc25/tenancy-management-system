from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from tenants.models import TenantProfile
from properties.models import Property
from datetime import date
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from payments.models import Payment  # if you have this app
from datetime import date, timedelta
from django.db.models import Sum
from django.utils.timezone import now

# ✅ 1. Recent Tenants
@api_view(['GET'])
@permission_classes([IsAdminUser])
def recent_tenants(request):
    tenants = TenantProfile.objects.select_related('user', 'property').order_by('-created_at')[:5]
    data = [
        {
            "id": t.id,
            "name": t.user.get_full_name() or t.user.username,
            "email": t.user.email,
            "property": str(t.property) if t.property else "N/A",
            "lease_start": t.lease_start_date,
            "lease_end": t.lease_end_date,
            "monthly_rent": t.monthly_rent,
        }
        for t in tenants
    ]
    return Response(data)


# ✅ 2. Upcoming Leases (within 30 days)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def upcoming_leases(request):
    today = date.today()
    end_date = today + timedelta(days=30)

    tenants = TenantProfile.objects.select_related('user', 'property').filter(
        lease_end_date__range=(today, end_date)
    ).order_by('lease_end_date')

    data = [
        {
            "id": t.id,
            "tenant": t.user.get_full_name() or t.user.username,
            "property": str(t.property) if t.property else "N/A",
            "lease_end_date": t.lease_end_date,
            "days_left": (t.lease_end_date - today).days,
        }
        for t in tenants
    ]
    return Response(data)


# ✅ 3. Rent Collection Summary (Monthly totals)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def rent_collection_summary(request):
    # Get payments grouped by month for the current year
    current_year = now().year
    monthly_data = (
        Payment.objects.filter(payment_date__year=current_year)
        .values("payment_date__month")
        .annotate(total_collected=Sum("amount"))
        .order_by("payment_date__month")
    )

    months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    chart_data = []
    for m in monthly_data:
        month_name = months[m["payment_date__month"] - 1]
        chart_data.append({
            "month": month_name,
            "total_collected": float(m["total_collected"]),
        })

    return Response(chart_data)


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
