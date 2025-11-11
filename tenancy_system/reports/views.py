from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from tenants.models import TenantProfile
from .models import Report
from .serializers import ReportSerializer
from rest_framework.permissions import IsAdminUser


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
            "status": r.status.replace("_", " ").title(),
            "created_at": r.created_at.strftime("%b %d, %Y"),
        }
        for r in reports
    ]
    return Response(data)

# Existing get_all_reports() remains

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_report_detail(request, pk):
    """Fetch detailed info of one report"""
    try:
        report = Report.objects.select_related('tenant__user', 'tenant__property').get(pk=pk)
    except Report.DoesNotExist:
        return Response({"error": "Report not found"}, status=404)

    data = {
        "id": report.id,
        "tenant": report.tenant.user.username,
        "property": str(report.tenant.property) if report.tenant.property else "N/A",
        "title": report.title,
        "message": report.message,
        "status": report.status,
        "image": request.build_absolute_uri(report.image.url) if report.image else None,
        "created_at": report.created_at.strftime("%b %d, %Y"),
    }
    return Response(data)


@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def update_report_status(request, pk):
    """Allow admin to update the report's status"""
    try:
        report = Report.objects.get(pk=pk)
    except Report.DoesNotExist:
        return Response({"error": "Report not found"}, status=404)

    new_status = request.data.get('status')
    if new_status not in ['SUBMITTED', 'IN_PROGRESS', 'RESOLVED']:
        return Response({"error": "Invalid status value"}, status=400)

    report.status = new_status
    report.save()

    return Response({"success": True, "message": "Status updated successfully", "status": report.status})