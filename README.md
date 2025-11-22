# Tenancy Management System
## Description

The Tenancy Management System is a full-stack web application that enables property managers and tenants to efficiently manage rental properties, process payments, track maintenance issues, and receive notifications. The system provides a secure, role-based interface for admins to manage properties and tenants, and for tenants to view their dashboards and submit payments or maintenance reports.

## Features

- Role-based authentication (Admin and Tenant)
- Property management (CRUD operations)
- Tenant registration and profile management
- Payment submission with proof upload and admin approval workflow
- Maintenance/issue reporting with image attachments and status tracking
- Notification system (broadcast and targeted messages)
- Responsive user interface (React + Tailwind CSS)
- REST API with JWT authentication (Django REST Framework)
- Frontend deployed on Render
- Backend and database hosted on PythonAnywhere

## How to Run

### Frontend (Local Development)

```powershell
cd Frontend/my-tenancy-frontend
npm install
npm run dev
```
Access the application at `http://localhost:5173`

### Backend (Local Development)

```powershell
cd tenancy_system
python -m venv .venv
. .venv/Scripts/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Backend API runs at `http://127.0.0.1:8000`

### Environment Variables

**Frontend (.env):**
```
VITE_API_BASE_URL=https://mrabaajr.pythonanywhere.com/api/
```

**Backend (.env):**
```
DJANGO_SECRET_KEY=<your-secret-key>
DEBUG=false
ALLOWED_HOSTS=mrabaajr.pythonanywhere.com
CORS_ALLOWED_ORIGINS=https://tenancy-management-system.onrender.com
```
## Live Demo
- Frontend: https://tenancy-management-system.onrender.com
- Backend / Admin: https://mrabaajr.pythonanywhere.com/admin/
