from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from tenants.models import TenantProfile
from .models import Report
from .serializers import ReportSerializer


# ✅ Tenant: View their reports
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tenant_reports(request):
    user = request.user
    tenant = TenantProfile.objects.filter(user_id=user.id).first()

    if not tenant:
        return Response({"error": "Tenant profile not found"}, status=404)

    reports = Report.objects.filter(tenant=tenant).order_by('-created_at')
    serializer = ReportSerializer(reports, many=True)
    return Response(serializer.data)


# ✅ Tenant: Add a new maintenance report
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_tenant_report(request):
    user = request.user
    tenant = TenantProfile.objects.filter(user_id=user.id).first()

    if not tenant:
        return Response({"error": "Tenant profile not found"}, status=404)

    serializer = ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(tenant=tenant)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ Admin: View all reports
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_all_reports(request):
    reports = Report.objects.select_related('tenant__user').order_by('-created_at')
    data = [
        {
            "id": r.id,
            "tenant": r.tenant.user.get_full_name() or r.tenant.user.username,
            "property": str(r.tenant.property) if r.tenant.property else "N/A",
            "title": r.title,
            "message": r.message,
            "status": r.status,
            "created_at": r.created_at,
        }
        for r in reports
    ]
    return Response(data)


# ✅ Admin: Manually create a report
@api_view(['POST'])
@permission_classes([IsAdminUser])
def submit_report(request):
    serializer = ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tenant_report_detail(request, report_id):
    """Fetch a single tenant report by ID."""
    tenant = TenantProfile.objects.filter(user_id=request.user.id).first()
    if not tenant:
        return Response({"error": "Tenant profile not found"}, status=404)

    try:
        report = Report.objects.get(id=report_id, tenant=tenant)
    except Report.DoesNotExist:
        return Response({"error": "Report not found"}, status=404)

    serializer = ReportSerializer(report)
    return Response(serializer.data)