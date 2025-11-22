from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Report
from .serializers import ReportSerializer
from tenants.models import TenantProfile



class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all().order_by('-created_at')
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]

    # -----------------------------------------
    # LIST REPORTS BY TENANT
    # GET /api/reports/tenant/<tenant_id>/
    # -----------------------------------------
    @action(detail=False, methods=['get'], url_path='tenant/(?P<tenant_id>[^/.]+)')
    def tenant_reports(self, request, tenant_id=None):
        try:
            tenant = Tenant.objects.get(id=tenant_id)
        except Tenant.DoesNotExist:
            return Response(
                {"error": "Tenant not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        reports = Report.objects.filter(tenant=tenant)
        serializer = self.get_serializer(reports, many=True)
        return Response(serializer.data)

    # -----------------------------------------
    # CREATE REPORT FOR SPECIFIC TENANT
    # POST /api/reports/tenant/<tenant_id>/add/
    # -----------------------------------------
    @action(detail=False, methods=['post'], url_path='tenant/(?P<tenant_id>[^/.]+)/add')
    def create_for_tenant(self, request, tenant_id=None):
        try:
            tenant = Tenant.objects.get(id=tenant_id)
        except Tenant.DoesNotExist:
            return Response(
                {"error": "Tenant not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        data = request.data.copy()
        data['tenant'] = tenant.id

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # -----------------------------------------
    # UPDATE REPORT STATUS
    # POST /api/reports/<id>/update-status/
    # -----------------------------------------
    @action(detail=True, methods=['post'], url_path='update-status')
    def update_status(self, request, pk=None):
        report = self.get_object()
        new_status = request.data.get('status')

        if not new_status:
            return Response({"error": "Status is required"}, status=400)

        report.status = new_status
        report.save()

        return Response({"success": True, "new_status": new_status})

    # -----------------------------------------
    # SUBMIT REPORT (SHORTCUT)
    # POST /api/reports/submit/
    # -----------------------------------------
    @action(detail=False, methods=['post'], url_path='submit')
    def submit_report(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)

