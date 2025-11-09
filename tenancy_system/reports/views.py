from django.http import JsonResponse
from .models import Report
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Report
from .serializers import ReportSerializer 


@login_required
def submit_report(request):
    if request.method == "POST":
        form = ReportForm(request.POST, request.FILES)
        if form.is_valid():
            report = form.save(commit=False)
            report.tenant = request.user.tenant_profile
            report.save()
            return redirect("dashboard")  # or wherever you want to go next
    else:
        form = ReportForm()

    return render(request, "reports/submit_report.html", {"form": form})

def get_all_reports(request):
    reports = Report.objects.select_related('tenant__user').all().order_by('-created_at')

    data = [
        {
            "id": report.id,
            "title": report.title,
            "tenant": report.tenant.user.username,
            "status": report.status.replace("_", " ").title(),
            "created_at": report.created_at.strftime("%b %d, %Y, %I:%M %p"),
        }
        for report in reports
    ]
    return JsonResponse({"reports": data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tenant_reports(request):
    try:
        tenant = request.user.tenant_profile  # get logged-in tenant
    except Exception:
        return Response({"error": "Tenant profile not found"}, status=404)

    reports = Report.objects.filter(tenant=tenant).order_by('-created_at')
    serializer = ReportSerializer(reports, many=True)
    return Response({"reports": serializer.data})
