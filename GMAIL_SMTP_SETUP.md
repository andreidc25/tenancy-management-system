# Gmail SMTP Setup Guide

## Overview
This guide will help you configure Gmail SMTP to send tenant credentials via email instead of showing them in the console.

## Prerequisites
- Gmail account
- 2-Step Verification enabled on your Gmail account

---

## Step 1: Generate Gmail App Password

1. Go to https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Look for **2-Step Verification**:
   - If not enabled, click on it and follow the steps to enable it
4. After 2-Step Verification is enabled, scroll down to find **App passwords**
5. Click on **App passwords**
6. Select:
   - **App**: Mail
   - **Device**: Windows Computer
7. Google will generate a **16-character password**
8. Copy this password (you'll need it in Step 3)

⚠️ **Keep this password safe!** It has access to your Gmail account.

---

## Step 2: Create .env File

In the `tenancy_system/` directory, create a file named `.env` (copy from `.env.example`):

```
EMAIL_HOST_USER=your-gmail@gmail.com
EMAIL_HOST_PASSWORD=your-16-character-app-password
```

Replace:
- `your-gmail@gmail.com` with your actual Gmail address
- `your-16-character-app-password` with the app password from Step 1

---

## Step 3: Install python-dotenv

The venv already has python-dotenv installed. If not, run:

```powershell
.\.venv\Scripts\pip.exe install python-dotenv
```

---

## Step 4: How It Works

When an admin creates a new tenant account:

1. Admin submits: username, email, property
2. Django generates a temporary password
3. Django sends an email with:
   - Username
   - Temporary password
   - Login instructions
4. Tenant receives email and logs in
5. Tenant changes password after first login

**No console output** - everything goes via email!

---

## Step 5: Testing

### Test 1: Via API
1. Make sure Django server is running
2. POST to `/api/tenant-register/` with:
```json
{
  "username": "testuser",
  "email": "yourtestingmail@gmail.com",
  "property": 1
}
```

3. Check the email for credentials

### Test 2: From Django Admin
1. Go to http://127.0.0.1:8000/admin/
2. Login as superuser
3. Create a new user and tenant manually
4. An email will be sent

---

## Troubleshooting

### Error: "SMTPAuthenticationError"
- ❌ App password is incorrect
- ❌ Gmail account doesn't have 2-Step Verification enabled
- ❌ Email format is wrong

### Error: "SMTPNotSupportedError"
- ❌ Gmail is blocking the connection
- ✅ Allow "Less secure apps" (if not using App Password)

### Email not received
- Check spam/junk folder
- Verify email address is correct in request
- Check Django logs for errors

---

## Security Notes

🔒 **Best Practices:**
1. Never commit `.env` file to Git (add to `.gitignore`)
2. Use App Passwords (not your main Gmail password)
3. In production, use environment variables from your hosting provider (not .env)
4. Rotate app passwords periodically

---

## Email Template (Customizable)

Currently sends:
```
Hello {username},

Welcome to the Tenancy Management System!
An account has been created for you.

Username: {username}
Temporary Password: {temp_password}

Please log in and change your password after your first login.
Visit: http://127.0.0.1:8000/login/

Best regards,
Tenancy Management System
```

To customize, edit `tenants/views.py` in the `TenantRegistrationViewSet.create()` method.

---

## Production Deployment

For production:
1. Use Gmail's SMTP or a professional email service (SendGrid, Mailgun, etc.)
2. Set environment variables on your hosting platform (PythonAnywhere, Heroku, etc.)
3. Never hardcode credentials
4. Use a more professional email address (like `noreply@yourcompany.com`)

