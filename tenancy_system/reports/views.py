from django.http import JsonResponse
from .models import Report
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


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
