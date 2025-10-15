from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import User
from .forms import TenantRegisterForm, ProfileUpdateForm
from tenants.models import TenantProfile
from payments.models import Payment
from django.db.models import Q
from notifications.models import Notification
from reports.models import Report
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def test_api(request):
    return Response({'message': 'Django backend is connected!'})


# ✅ helper: only staff/superusers can register tenants
def is_admin(user):
    return user.is_staff or user.is_superuser


@user_passes_test(is_admin)
def register(request):
    if request.method == 'POST':
        form = TenantRegisterForm(request.POST)
        if form.is_valid():
            # Save the user (basic account info)
            user = form.save(commit=False)
            user.username = form.cleaned_data['username']
            user.email = form.cleaned_data['email']
            user.save()

            # Create the tenant profile
            TenantProfile.objects.create(
                user=user,
                birthday=form.cleaned_data.get('birthday'),
                property_rented=form.cleaned_data['property_rented'],
                lease_expiry=form.cleaned_data['lease_expiry']
            )

            messages.success(request, "Tenant account created successfully!")
            return redirect('accounts:dashboard')
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = TenantRegisterForm()
    return render(request, 'accounts/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('accounts:dashboard')
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})


@login_required
def dashboard(request):
    return render(request, 'accounts/dashboard.html')


@login_required
def profile_update(request):
    if request.method == 'POST':
        form = ProfileUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, "Profile updated successfully!")
            return redirect('accounts:dashboard')
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = ProfileUpdateForm(instance=request.user)
    return render(request, 'accounts/profile_update.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out.")
    return redirect('accounts:login')

@login_required
def dashboard(request):
    try:
        tenant_profile = request.user.tenant_profile
        # Fetch all payments for this tenant, newest first
        payments = Payment.objects.filter(tenant=tenant_profile).order_by('-payment_date')
    except AttributeError: # Handles case where user has no tenant_profile
        tenant_profile = None
        payments = []

    context = {
        'tenant': tenant_profile,
        'property': tenant_profile.property if tenant_profile else None,
        'payments': payments, # Pass the payments to the template
    }
    return render(request, 'accounts/dashboard.html', context)

from django.db.models import Q # Make sure to import Q
from notifications.models import Notification # Import the Notification model

@login_required
def dashboard(request):
    # ... (your existing code to get tenant_profile, payments, etc.)

    notifications = []
    if tenant_profile:
        # Get notifications for this specific tenant OR broadcast messages (where tenant is NULL)
        # Order by newest first
        notifications = Notification.objects.filter(
            Q(tenant=tenant_profile) | Q(tenant__isnull=True)
        ).order_by('-created_at')

    context = {
        # ... (your existing context data)
        'notifications': notifications,
    }
    return render(request, 'accounts/dashboard.html', context)

@login_required
def dashboard_redirect(request):
    """
    Checks the user's role and redirects them to the correct dashboard.
    """
    # Check if the user is a superuser or staff (our definition of an admin)
    if request.user.is_superuser or request.user.is_staff:
        return redirect('admin_dashboard')
    
    # Check if the user is a tenant
    elif hasattr(request.user, 'tenant_profile'):
        return redirect('tenant_dashboard')
        
    # Optional: A fallback for any other type of user
    else:
        # You can decide where they should go. Logging them out is a safe default.
        return redirect('logout') 

@login_required
def admin_dashboard(request):
    # Add logic here to fetch data for the admin (e.g., all tenants, all properties)
    return render(request, 'accounts/admin_dashboard.html')

@login_required
def tenant_dashboard(request):
    """
    Displays the dashboard for a logged-in tenant.
    """
    tenant_profile = None
    property_info = None
    payments = []
    notifications = []
    reports = []

    try:
        # Get the tenant's profile
        tenant_profile = request.user.tenant_profile
        property_info = tenant_profile.property

        # Get all related data for the dashboard
        payments = Payment.objects.filter(tenant=tenant_profile).order_by('-payment_date')
        reports = Report.objects.filter(tenant=tenant_profile).order_by('-created_at')
        
        # Get notifications for this tenant AND broadcast messages (where tenant is NULL)
        notifications = Notification.objects.filter(
            Q(tenant=tenant_profile) | Q(tenant__isnull=True)
        ).order_by('-created_at')

    except AttributeError:
        # This handles cases where a logged-in user might not have a tenant profile
        pass

    # This is the corrected context dictionary
    context = {
        'tenant': tenant_profile,
        'property': property_info,
        'payments': payments,
        'notifications': notifications,
        'reports': reports,
    }
    
    return render(request, 'accounts/tenant_dashboard.html', context)

