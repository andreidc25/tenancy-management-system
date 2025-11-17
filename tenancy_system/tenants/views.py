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
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from datetime import date
from django.db.models import Sum
import secrets

from .forms import RegisterForm, ProfileUpdateForm
from .models import TenantProfile
from .serializers import TenantProfileSerializer
from properties.models import Property
from payments.models import Payment


# --------------------- #
#    Classic Django Views
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
    queryset = TenantProfile.objects.all().select_related('user', 'property')
    serializer_class = TenantProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    # ✅ Unified GET + PATCH /tenants/profile/
    @action(detail=False, methods=['get', 'patch'], url_path='profile')
    def profile(self, request):
        """Handle GET (view) and PATCH (update) for tenant profile"""
        try:
            tenant = TenantProfile.objects.select_related('user').get(user=request.user)
        except TenantProfile.DoesNotExist:
            return Response({"error": "Tenant profile not found."}, status=status.HTTP_404_NOT_FOUND)

        # 🟢 GET — view profile
        if request.method == 'GET':
            serializer = self.get_serializer(tenant)
            return Response(serializer.data)

        # 🟡 PATCH — update profile
        elif request.method == 'PATCH':
            serializer = self.get_serializer(tenant, data=request.data, partial=True)
            if serializer.is_valid():
                user_data = request.data

                # Update name and email from User model
                user = tenant.user
                if "full_name" in user_data:
                    user.first_name = user_data["full_name"]
                if "email" in user_data:
                    user.email = user_data["email"]
                user.save()

                serializer.save()
                return Response(
                    {"message": "Profile updated successfully", "data": serializer.data},
                    status=status.HTTP_200_OK,
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # ✅ POST /tenants/profile/change-password/
    @action(detail=False, methods=['post'], url_path='profile/change-password')
    def change_password(self, request):
        """Allow tenant to change their own password"""
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        # Validate fields
        if not all([current_password, new_password, confirm_password]):
            return Response({"error": "All password fields are required."}, status=400)

        if not user.check_password(current_password):
            return Response({"error": "Current password is incorrect."}, status=400)

        if new_password != confirm_password:
            return Response({"error": "New passwords do not match."}, status=400)

        if len(new_password) < 6:
            return Response({"error": "Password must be at least 6 characters long."}, status=400)

        # ✅ Save new password
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password changed successfully."}, status=200)


# ✅ Tenant Registration (Admin only)
class TenantRegistrationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser]

    def create(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        property_id = request.data.get("property")

        if not username or not email or not property_id:
            return Response({"error": "Username, email, and property are required."},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=400)
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=400)

        temp_password = secrets.token_urlsafe(8)
        user = User.objects.create_user(username=username, email=email, password=temp_password)

        try:
            property_obj = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({"error": "Property not found."}, status=404)

        TenantProfile.objects.create(
            user=user,
            property=property_obj,
            lease_start_date="2025-11-01",
            lease_end_date="2026-11-01",
            monthly_rent=0,
            security_deposit=0,
            is_active=True,
        )

        try:
            send_mail(
                subject="Your Tenancy Account - Credentials",
                message=(
                    f"Hello {username},\n\n"
                    "Welcome to the Tenancy Management System!\n"
                    "An account has been created for you.\n\n"
                    f"Username: {username}\n"
                    f"Temporary Password: {temp_password}\n\n"
                    "Please log in and change your password after your first login.\n"
                    "Visit: http://127.0.0.1:8000/login/\n\n"
                    "Best regards,\n"
                    "Tenancy Management System"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
            print(f"✓ Email sent successfully to {email}")
        except Exception as e:
            print(f"✗ Email sending failed: {e}")
            return Response(
                {"error": f"Tenant created but email failed to send: {e}"},
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"message": f"Tenant '{username}' registered successfully. Email sent to {email}."},
            status=status.HTTP_201_CREATED,
        )


# --------------------- #
#    Other API Endpoints
# --------------------- #

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tenant_balance(request, tenant_id):
    """Compute the current rent balance of a tenant"""
    try:
        tenant = TenantProfile.objects.get(user_id=tenant_id)
    except TenantProfile.DoesNotExist:
        return Response({'error': 'Tenant not found'}, status=404)

    today = date.today()
    lease_start = tenant.lease_start_date
    lease_end = tenant.lease_end_date

    months_due = (min(today, lease_end).year - lease_start.year) * 12 + (
        min(today, lease_end).month - lease_start.month
    ) + 1
    if months_due < 0:
        months_due = 0

    total_due = tenant.monthly_rent * months_due
    total_paid = Payment.objects.filter(
        tenant=tenant, status='COMPLETED'
    ).aggregate(total=Sum('amount'))['total'] or 0
    remaining_balance = max(total_due - total_paid, 0)
    overdue = today > lease_end and remaining_balance > 0

    return Response({
        'tenant': tenant.user.username,
        'monthly_rent': tenant.monthly_rent,
        'months_due': months_due,
        'total_due': total_due,
        'total_paid': total_paid,
        'balance': remaining_balance,
        'lease_end_date': lease_end,
        'overdue': overdue,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tenant_profile(request):
    """Return minimal tenant profile info (for reference)"""
    try:
        tenant = TenantProfile.objects.get(user=request.user)
        return Response({
            "tenant_id": tenant.id,
            "user_id": request.user.id,
            "username": request.user.username,
        })
    except TenantProfile.DoesNotExist:
        return Response({"error": "Tenant profile not found"}, status=404)
