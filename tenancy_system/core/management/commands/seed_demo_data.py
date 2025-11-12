from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from decimal import Decimal
import random

from properties.models import Property
from tenants.models import TenantProfile
from reports.models import Report
from payments.models import Payment
from notifications.models import Notification


class Command(BaseCommand):
    help = "Populate demo data for all models in the Tenancy System"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS("🚀 Starting data seeding..."))

        # ======================================================
        # 0️⃣ Create admin account (optional)
        # ======================================================
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username="admin",
                email="admin@example.com",
                password="admin123"
            )
            self.stdout.write(self.style.SUCCESS("🛡️ Created admin user (admin/admin123)"))

        # ======================================================
        # 1️⃣ CREATE PROPERTIES
        # ======================================================
        property_data = [
            {"name": "Sunset Villa", "address": "123 Beach Road", "property_type": "HOUSE", "unit_number": "A1", "rent_price": 15000},
            {"name": "Pine Apartments", "address": "45 Elm Street", "property_type": "APARTMENT", "unit_number": "3B", "rent_price": 12000},
            {"name": "City Heights", "address": "99 Downtown Ave", "property_type": "APARTMENT", "unit_number": "5C", "rent_price": 18000},
            {"name": "Maple Residences", "address": "78 North Lane", "property_type": "HOUSE", "unit_number": None, "rent_price": 10000},
        ]
        Property.objects.all().delete()
        props = [Property.objects.create(**p) for p in property_data]
        self.stdout.write(self.style.SUCCESS(f"🏠 Created {len(props)} properties"))

        # ======================================================
        # 2️⃣ CREATE USERS + TENANTS
        # ======================================================
        users_data = [
            {"username": "bonbon.acm", "first_name": "Bonbon", "last_name": "Acm", "email": "bonbon.acm@example.com"},
            {"username": "rafael.tenant", "first_name": "Rafael", "last_name": "Tenant", "email": "rafael.tenant@example.com"},
            {"username": "maria.client", "first_name": "Maria", "last_name": "Client", "email": "maria.client@example.com"},
            {"username": "juan.renter", "first_name": "Juan", "last_name": "Renter", "email": "juan.renter@example.com"},
        ]

        User.objects.filter(username__in=[u["username"] for u in users_data]).delete()
        TenantProfile.objects.all().delete()

        users = []
        for data in users_data:
            user = User.objects.create_user(
                username=data["username"],
                first_name=data["first_name"],
                last_name=data["last_name"],
                email=data["email"],
                password="tenant123"
            )
            users.append(user)

        tenants = []
        for user in users:
            lease_start = timezone.now().date()
            lease_end = lease_start + timedelta(days=365)
            assigned_property = random.choice(props)  # ✅ props now guaranteed to exist
            tenant = TenantProfile.objects.create(
                user=user,
                phone_number="09" + str(random.randint(100000000, 999999999)),
                property=assigned_property,
                lease_start_date=lease_start,
                lease_end_date=lease_end,
                monthly_rent=Decimal(random.choice([8000, 10000, 12000, 15000])),
                security_deposit=Decimal(random.choice([4000, 5000, 6000])),
                is_active=True,
            )
            tenants.append(tenant)
        self.stdout.write(self.style.SUCCESS(f"👥 Created {len(tenants)} tenant profiles"))

        # ======================================================
        # 3️⃣ CREATE REPORTS
        # ======================================================
        report_titles = [
            "Sirang Tubo sa CR",
            "May tagas sa kisame",
            "Walang kuryente sa kusina",
            "Aircon hindi gumagana",
            "Basag na bintana",
            "Baradong lababo",
            "Walang tubig sa umaga",
            "Sirang door lock",
        ]

        Report.objects.all().delete()
        for i in range(8):
            Report.objects.create(
                tenant=random.choice(tenants),
                title=report_titles[i],
                message=f"Sample report message for issue {i+1}",
                status=random.choice(["SUBMITTED", "IN_PROGRESS", "RESOLVED"]),
                created_at=timezone.now(),
            )
        self.stdout.write(self.style.SUCCESS("🧾 Created 8 reports"))

        # ======================================================
        # 4️⃣ CREATE PAYMENTS
        # ======================================================
        Payment.objects.all().delete()
        for tenant in tenants:
            for _ in range(random.randint(2, 4)):
                Payment.objects.create(
                    tenant=tenant,
                    amount=Decimal(random.choice([8000, 10000, 12000, 15000])),
                    payment_date=timezone.now().date() - timedelta(days=random.randint(0, 90)),
                    payment_method=random.choice(["CASH", "BANK", "ONLINE"]),
                    status=random.choice(["PENDING", "COMPLETED"]),
                    notes="Auto-generated test payment",
                )
        self.stdout.write(self.style.SUCCESS("💰 Created payments for tenants"))

        # ======================================================
        # 5️⃣ CREATE NOTIFICATIONS
        # ======================================================
        Notification.objects.all().delete()
        notif_samples = [
            {"title": "Water Maintenance", "message": "Scheduled maintenance on Nov 10, 2025.", "notification_type": "MAINT"},
            {"title": "Payment Reminder", "message": "Please settle your rent for this month.", "notification_type": "PAYMENT"},
            {"title": "Welcome!", "message": "Welcome to your new home at Sunset Villa!", "notification_type": "ANNOUNCE"},
        ]
        for notif in notif_samples:
            Notification.objects.create(**notif)  # broadcast
        for tenant in tenants:
            Notification.objects.create(
                tenant=tenant,
                title="Personal Notice",
                message=f"Hi {tenant.user.first_name}, your rent is due soon.",
                notification_type="PAYMENT",
            )
        self.stdout.write(self.style.SUCCESS("🔔 Created notifications"))

        # ======================================================
        # ✅ SUMMARY
        # ======================================================
        self.stdout.write(self.style.SUCCESS("\n✅ DEMO DATA SEEDED SUCCESSFULLY!"))
        self.stdout.write(self.style.SUCCESS(f"Properties: {Property.objects.count()}"))
        self.stdout.write(self.style.SUCCESS(f"Tenants: {TenantProfile.objects.count()}"))
        self.stdout.write(self.style.SUCCESS(f"Reports: {Report.objects.count()}"))
        self.stdout.write(self.style.SUCCESS(f"Payments: {Payment.objects.count()}"))
        self.stdout.write(self.style.SUCCESS(f"Notifications: {Notification.objects.count()}"))
