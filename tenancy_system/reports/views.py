from django.http import JsonResponse
from .models import Report

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
