from django.http import JsonResponse
from .models import Report
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Report
from .serializers import ReportSerializer 
from rest_framework import status
from notifications.models import Notification  # ✅ add this import
from django.contrib.auth.models import User  # to identify admins



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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_tenant_report(request):
    try:
        tenant = request.user.tenant_profile  # ✅ Correct relationship name
    except Exception:
        return Response({"error": "Tenant profile not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ReportSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(tenant=tenant)
        return Response(
            {"message": "Report submitted successfully", "report": serializer.data},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_tenant_report(request):
    try:
        tenant = request.user.tenant_profile
    except Exception:
        return Response({"error": "Tenant profile not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ReportSerializer(data=request.data)
    if serializer.is_valid():
        report = serializer.save(tenant=tenant)

        # ✅ Create notification for admin
        try:
            # You can target all admins or a specific one
            admins = User.objects.filter(is_superuser=True)
            for admin in admins:
                Notification.objects.create(
                    recipient=admin,
                    message=f"New report submitted by {tenant.user.username}: '{report.title}'"
                )
        except Exception as e:
            print("⚠️ Failed to create admin notification:", e)

        return Response(
            {"message": "Report submitted successfully", "report": serializer.data},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)