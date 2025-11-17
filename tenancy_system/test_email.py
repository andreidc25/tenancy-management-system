"""
Test script to verify Gmail SMTP configuration
Run this to test email sending before deploying
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tenancy_system.settings')
django.setup()

from django.core.mail import send_mail
from django.conf import settings

print("=" * 60)
print("Testing Gmail SMTP Configuration")
print("=" * 60)
print(f"Email Backend: {settings.EMAIL_BACKEND}")
print(f"Email Host: {settings.EMAIL_HOST}")
print(f"Email Port: {settings.EMAIL_PORT}")
print(f"Email Host User: {settings.EMAIL_HOST_USER}")
print(f"Default From Email: {settings.DEFAULT_FROM_EMAIL}")
print("=" * 60)

try:
    send_mail(
        subject="Test Email - Tenancy System",
        message="If you see this, Gmail SMTP is configured correctly!",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.EMAIL_HOST_USER],  # Send to yourself for testing
        fail_silently=False,
    )
    print("✓ Email sent successfully!")
    print(f"✓ Check {settings.EMAIL_HOST_USER} inbox")
except Exception as e:
    print(f"✗ Error: {e}")
    print("\nTroubleshooting:")
    print("1. Make sure .env file is filled with correct credentials")
    print("2. Gmail account must have 2-Step Verification enabled")
    print("3. Check that the 16-character App Password is correct")
    print("4. Verify EMAIL_HOST_USER and EMAIL_HOST_PASSWORD in .env")
