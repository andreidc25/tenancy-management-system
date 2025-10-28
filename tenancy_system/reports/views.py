from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import ReportForm

@login_required
def submit_report(request):
    if request.method == 'POST':
        form = ReportForm(request.POST, request.FILES)
        if form.is_valid():
            report = form.save(commit=False)
            # Link the report to the logged-in tenant
            report.tenant = request.user.tenant_profile
            report.save()
            return redirect('dashboard') # Redirect to dashboard after submission
    else:
        form = ReportForm()

    return render(request, 'reports/submit_report.html', {'form': form})