# 📧 Gmail SMTP Implementation - Complete Setup Guide

## What Was Changed

### 1. **settings.py** - Email Configuration
```python
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', 'your-gmail@gmail.com')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', 'your-app-password')
DEFAULT_FROM_EMAIL = os.getenv('EMAIL_HOST_USER', 'your-gmail@gmail.com')
```

### 2. **tenants/views.py** - Better Email Message
- Updated email subject and body to be more professional
- Removed console output of temporary password
- Added error handling for email failures

### 3. **.env File** - Secure Credentials
```
EMAIL_HOST_USER=your-gmail@gmail.com
EMAIL_HOST_PASSWORD=your-16-character-app-password
```

### 4. **.gitignore** - Security
- Added `.env` to prevent credentials from being committed to Git

---

## 📋 Quick Start (3 Steps)

### Step 1: Get Gmail App Password
1. Visit https://myaccount.google.com/
2. Go to **Security** → **2-Step Verification** (enable if needed)
3. Go to **App passwords**
4. Select Mail + Windows Computer
5. Copy the 16-character password

### Step 2: Update .env File
Edit `tenancy_system/.env`:
```
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=xxxxxxxxxxxxxxxx
```

### Step 3: Test It
```powershell
cd tenancy_system
.\.venv\Scripts\python.exe test_email.py
```
✓ You should receive a test email!

---

## 🚀 How It Works Now

### Before (Console Backend):
1. Admin creates tenant → Password shown in console ❌
2. Tenant can't access credentials securely ❌

### After (Gmail SMTP):
1. Admin creates tenant via API
2. Django generates temporary password
3. Email is sent to tenant's email ✅
4. Tenant receives credentials securely ✅
5. No sensitive data in console ✅

---

## 📝 API Example

**Create new tenant account:**
```bash
POST http://127.0.0.1:8000/api/tenant-register/

{
  "username": "john.doe",
  "email": "john@example.com",
  "property": 1
}
```

**Response:**
```json
{
  "message": "Tenant 'john.doe' registered successfully. Email sent to john@example.com."
}
```

**John's inbox receives:**
```
Subject: Your Tenancy Account - Credentials

Hello john.doe,

Welcome to the Tenancy Management System!
An account has been created for you.

Username: john.doe
Temporary Password: abc123XyZ9-_

Please log in and change your password after your first login.
Visit: http://127.0.0.1:8000/login/

Best regards,
Tenancy Management System
```

---

## ✅ Verification Checklist

- [ ] Gmail account has 2-Step Verification enabled
- [ ] App password generated and copied
- [ ] `.env` file created in `tenancy_system/` directory
- [ ] `.env` file filled with correct credentials
- [ ] Test email script runs successfully
- [ ] Received test email in inbox
- [ ] `.env` added to `.gitignore` (for security)

---

## 🔒 Security Best Practices

✅ **Do:**
- Use App Passwords (not your main Gmail password)
- Keep `.env` file private (never commit to Git)
- Rotate app passwords periodically
- Use environment variables in production

❌ **Don't:**
- Hardcode credentials in code
- Share `.env` file with others
- Use your main Gmail password
- Commit `.env` to version control

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "SMTPAuthenticationError" | Check `.env` credentials are correct |
| "2-Step Verification not enabled" | Enable it at https://myaccount.google.com/security |
| Email not received | Check spam folder, verify recipient email |
| "Connection refused" | Ensure Gmail SMTP port 587 is not blocked |

---

## 📚 Files Modified/Created

```
tenancy_system/
├── settings.py (MODIFIED - email config)
├── tenants/views.py (MODIFIED - email message)
├── .env (CREATED - credentials)
├── .env.example (CREATED - template)
├── test_email.py (CREATED - test script)
└── GMAIL_SMTP_SETUP.md (CREATED - detailed guide)

.gitignore (CREATED - security)
```

---

## 🎯 Next Steps

1. ✅ Configure `.env` with Gmail credentials
2. ✅ Test with `test_email.py`
3. ✅ Create a test tenant account via API
4. ✅ Verify credentials are sent via email
5. ✅ Commit code changes (but NOT `.env`!)

---

## Support

For Gmail SMTP issues, visit:
- https://support.google.com/mail/answer/185833 (App Passwords)
- https://support.google.com/accounts/answer/185833 (2-Step Verification)

