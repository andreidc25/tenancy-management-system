from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.models import User
from .forms import TenantRegisterForm, ProfileUpdateForm
from .models import TenantProfile


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
