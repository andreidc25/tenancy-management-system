# 🚀 Deployment Guide: PythonAnywhere (Backend) + Vercel (Frontend)

## **Part 1: Backend Deployment to PythonAnywhere**

### **Step 1: Create PythonAnywhere Account**
1. Go to https://www.pythonanywhere.com/
2. Sign up (free tier available)
3. Confirm email

### **Step 2: Upload Django Code**
**Option A: Using Git (Recommended)**
```bash
# In PythonAnywhere console:
cd ~
git clone https://github.com/andreidc25/tenancy-management-system.git
cd tenancy-management-system
```

**Option B: Using Web Upload**
- Go to Files → Upload files
- Zip your entire project and upload

### **Step 3: Set Up Virtual Environment**
```bash
cd ~/tenancy-management-system/tenancy_system
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### **Step 4: Configure Django Settings**
1. In **Web** tab → Add a new web app
2. Choose **Manual configuration**
3. Select **Python 3.11**
4. Set WSGI configuration file path:
   - Edit `/var/www/yourusername_pythonanywhere_com_wsgi.py`

**WSGI Config Example:**
```python
import sys
import os

path = '/home/yourusername/tenancy-management-system/tenancy_system'
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'tenancy_system.settings'

from django.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### **Step 5: Configure Static Files**
1. In Web tab, set **Static files**:
   - URL: `/static/`
   - Directory: `/home/yourusername/tenancy-management-system/tenancy_system/staticfiles`

2. Run:
```bash
cd ~/tenancy-management-system/tenancy_system
python manage.py collectstatic --noinput
```

### **Step 6: Set Environment Variables**
1. Go to Web → Add a new web app
2. Edit `.env` file in project root:
```
EMAIL_HOST_USER=your-gmail@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

3. Update settings.py for production:
```python
DEBUG = False  # Set to False in production
ALLOWED_HOSTS = ['yourusername.pythonanywhere.com', 'localhost']
STATIC_ROOT = '/home/yourusername/tenancy-management-system/tenancy_system/staticfiles'
```

### **Step 7: Reload Web App**
- Click **Reload** in Web tab

✅ Your Django backend is now live at: `https://yourusername.pythonanywhere.com/api/`

---

## **Part 2: Frontend Deployment to Vercel**

### **Step 1: Create Vercel Account**
1. Go to https://vercel.com/
2. Sign up with GitHub (recommended)
3. Connect your GitHub repository

### **Step 2: Deploy from Git**
1. In Vercel dashboard → New Project
2. Import from GitHub → Select `tenancy-management-system`
3. Framework: **Next.js** or **Vite** (depending on your setup)

### **Step 3: Environment Variables**
In Vercel project settings → Environment Variables:

```
REACT_APP_API_URL=https://yourusername.pythonanywhere.com/api
VITE_API_URL=https://yourusername.pythonanywhere.com/api
```

Update `.env.local` (local testing):
```
REACT_APP_API_URL=http://127.0.0.1:8000/api
VITE_API_URL=http://127.0.0.1:8000/api
```

### **Step 4: Update API Endpoints in Code**
Replace all hardcoded URLs like `http://127.0.0.1:8000` with environment variables.

**Example (LoginForm.jsx):**
```jsx
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const response = await axios.post(`${API_URL}/auth/login/`, {
    username: username,
    password: password
});
```

### **Step 5: Update CORS in Django**
In `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://your-vercel-app.vercel.app",  # Your Vercel domain
]
```

### **Step 6: Deploy**
- Push to GitHub → Vercel automatically deploys
- Or manually deploy: `vercel --prod`

✅ Your React frontend is now live at: `https://your-app.vercel.app`

---

## **Part 3: Quick Checklist**

### **Backend (PythonAnywhere)**
- [ ] Git repository cloned
- [ ] Virtual environment created
- [ ] Requirements installed
- [ ] `.env` file configured with Gmail credentials
- [ ] `STATIC_ROOT` configured
- [ ] `collectstatic` command run
- [ ] WSGI file configured
- [ ] Web app reloaded
- [ ] Can access `/admin/` page

### **Frontend (Vercel)**
- [ ] Repository connected to Vercel
- [ ] Environment variables set
- [ ] API URLs updated to use env vars
- [ ] CORS configured in Django
- [ ] Deploy triggered

---

## **Part 4: Testing Deployment**

### **Test Backend**
```bash
curl https://yourusername.pythonanywhere.com/api/auth/login/
```

Should return API info (not 404)

### **Test Frontend**
1. Visit `https://your-app.vercel.app`
2. Try logging in with credentials
3. Check browser DevTools → Network tab
4. Should see requests to your PythonAnywhere backend

### **Test API Connection**
Frontend console should show successful requests to:
- `https://yourusername.pythonanywhere.com/api/auth/login/`
- `https://yourusername.pythonanywhere.com/api/tenants/profile/`
- `https://yourusername.pythonanywhere.com/api/properties/my_property/`

---

## **CSS & Static Files Summary**

**Django Admin CSS:**
- ✅ Automatically handled by Django
- ✅ Located in Django package (no custom files needed)
- ✅ Deployed via `collectstatic` command

**Your Custom CSS:**
- Place in: `tenancy_system/static/css/`
- Collected during: `python manage.py collectstatic`
- Served from: `STATIC_ROOT = '/path/to/staticfiles'`

---

## **Troubleshooting**

### CSS Not Loading
```bash
# Run this on PythonAnywhere
python manage.py collectstatic --noinput --clear
# Then reload web app
```

### API Connection Failed
- Check CORS_ALLOWED_ORIGINS in settings.py
- Verify Vercel domain matches
- Check firewall/security settings

### 502 Bad Gateway
- Check WSGI configuration
- Verify virtual environment path
- Check web app error log in PythonAnywhere

---

## **Important Notes**

⚠️ **Before Going Live:**
1. Set `DEBUG = False` in production
2. Update `SECRET_KEY` (use strong random key)
3. Set `ALLOWED_HOSTS` correctly
4. Use environment variables for sensitive data
5. Test all features thoroughly
6. Set up proper logging

🔒 **Security:**
- Never commit `.env` to Git
- Use app passwords (not main password)
- Rotate secrets regularly
- Use HTTPS everywhere
- Enable 2FA on accounts

