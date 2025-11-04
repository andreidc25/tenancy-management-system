from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .forms import RegisterForm, ProfileUpdateForm
from .models import TenantProfile
from .serializers import TenantProfileSerializer
from properties.models import Property
import secrets


# --------------------- #
#    Classic Views
# --------------------- #

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account created! You can now log in.")
            return redirect('accounts:login')
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = RegisterForm()
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


# --------------------- #
#    API ViewSets
# --------------------- #

class TenantViewSet(viewsets.ModelViewSet):
    queryset = TenantProfile.objects.all()
    serializer_class = TenantProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


# ✅ NEW: Tenant Registration (admin creates + email invite)
class TenantRegistrationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser]

    def create(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        property_id = request.data.get("property")

        # Basic validation
        if not username or not email or not property_id:
            return Response(
                {"error": "Username, email, and property are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if username/email already used
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=400)
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=400)

        # Generate a temporary password
        temp_password = secrets.token_urlsafe(8)

        # Create user
        user = User.objects.create_user(username=username, email=email, password=temp_password)

        # Link to property
        try:
            property_obj = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({"error": "Property not found."}, status=404)

        # Create tenant profile
        TenantProfile.objects.create(
            user=user,
            property=property_obj,
            lease_start_date="2025-11-01",
            lease_end_date="2026-11-01",
            monthly_rent=0,
            security_deposit=0,
            is_active=True,
        )

        # Send welcome email
        try:
            send_mail(
                subject="Your Tenancy Account",
                message=(
                    f"Hello {username},\n\n"
                    "An account has been created for you in the Tenancy Management System.\n\n"
                    f"Username: {username}\n"
                    f"Temporary Password: {temp_password}\n\n"
                    "Please log in and change your password after your first login."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
        except Exception as e:
            print("Email sending error:", e)

        return Response(
            {"message": f"Tenant '{username}' registered successfully. Email sent to {email}."},
            status=status.HTTP_201_CREATED,
        )
