
# 🏠 Tenancy Management System (IKALAWANG KABANATA) — Patch 0.2.0

> *“PWEDE NA TOH.”*

---

##  Current Progress

### ✅ Done

* **Login & Registration System:**
  Fully functional user authentication using Django’s built-in `auth` system.
  Registration and login pages now redirect properly after success/failure.

* **Property Model:**

  * Defined property fields and structure (name, address, availability, type, etc.).
  * Populated property tables with actual addresses based on client data
    *(ex: “Villa Cuana Phase 3, Pinagbuhatan, Pasig City”)*.
  * Created separate unit addresses for apartments to handle multi-tenant cases.

* **Code Refactor:**

  * Reorganized directory structure for cleaner module separation.
  * Fixed messy imports and redundant files.
  * Overall project layout makes sense now 🙏

---

## 🧩 Important Bits & Implementation Notes

###  **1. Modular App Separation**

* **`accounts/`** → Handles user registration, login, and profile updates.
* **`properties/`** → Manages property data (address, type, availability).
* **`tenants/`** → Will handle tenant profiles and property linking logic.

This separation keeps the codebase clean and makes scaling easier later (e.g. landlord dashboard, analytics, etc.).

---

###  **2. Tenant–Property Relationship (Planned)**

* Upon registration, a tenant will be linked to a property record.
* That property’s `availability` field will automatically switch to `False` (or “Taken”).
* Logic will likely live in `tenants/models.py` or a post-save signal for automation.

---

### 🧭 **3. URL Routing (Still Messy af)**

* Currently, messy af ung routing, needs to be fixed

---

### 🧰 **4. Template Organization**

* Base layout lives in `accounts/templates/accounts/base.html`.
* All pages extend it (login, dashboard, etc.) for consistent structure.
* Will move base templates to a shared `/templates` directory later on.
* Use the base template if there is still no frontend available.

---

### ⚙️ **5. Refactor Notes**

* Dropped old migrations and unused test files.
* Fixed circular imports.
* Moved small logic chunks out of views for readability.

---

## 🧩 Next Action Plan

| Priority | Task                           | Description                                                   |
| :------: | :----------------------------- | :------------------------------------------------------------ |
|    🔥    | **Link Tenants to Properties** | On tenant registration, auto-link and mark property as taken. |
|    ⚙️    | **Dashboard Setup**            | Landlord/tenant dashboards for quick property summaries.      |
|    💅    | **Frontend Polish**            | Update templates, layout, and overall styling.                |
|    🧭    | **URL Routing Cleanup**        | Fix landing page, redirects, and general chaos.               |
|    🧰    | **Miscellaneous**              | Validations, error handling, and maybe some toast alerts.     |

---

## 🗂 Directory Overview

```
📦 tenancy_system/
├── 📜 manage.py
├── 📜 db.sqlite3

├── 📁 accounts/
│   ├── 📜 admin.py
│   ├── 📜 apps.py
│   ├── 📜 forms.py
│   ├── 📜 models.py
│   ├── 📜 tests.py
│   ├── 📜 urls.py
│   ├── 📜 views.py
│   ├── 📁 templates/
│   │   └── 📁 accounts/
│   │       ├── base.html
│   │       ├── dashboard.html
│   │       ├── login.html
│   │       ├── profile_update.html
│   │       └── register.html
│   └── 📁 migrations/
│       └── 0001_initial.py, 0002_delete_property_delete_tenantprofile.py

├── 📁 properties/
│   ├── 📜 admin.py
│   ├── 📜 apps.py
│   ├── 📜 models.py
│   ├── 📜 tests.py
│   ├── 📜 views.py
│   └── 📁 migrations/
│       └── 0001_initial.py

├── 📁 tenants/
│   ├── 📜 admin.py
│   ├── 📜 apps.py
│   ├── 📜 forms.py
│   ├── 📜 models.py
│   ├── 📜 tests.py
│   ├── 📜 views.py
│   └── 📁 migrations/
│       └── 0001_initial.py

└── 📁 tenancy_system/
    ├── 📜 asgi.py
    ├── 📜 settings.py
    ├── 📜 urls.py
    ├── 📜 wsgi.py
    └── 📜 __init__.py
```

---

## 🧠 Notes & Observations

* Refactor = **worth it** — structure is actually good shiii now.
* Routing aboslute asssss.
* Backend foundation is basically done(nottt!!!!); next patch = frontend and data linking and more backend shizzz.

---

## 🧾 Version Summary

**Patch:** `v0.2.0(IKALAWANG KABANATA)`
**Date:** October 2025
**Status:** Backend foundations ✅ | Dashboard/Frontend 🕐 | Routing 😵‍💫

---

##  Next Patch Goals (v0.3.0)

* Tenant–property linking system ✅
* Dashboard creation with property/tenant stats
* Frontend pass (modern, clean, responsive)
* Proper URL routing and navigation

---

## 🧱 Tech Stack

* 🐍 **Django** 5.2.5
* 🗃️ **SQLite** (for dev/testing)
* 🌐 **HTML / CSS / JS (Vanilla)** — for now
* ⚙️ **Session-based Authentication**

---

## ⚡ Setup & Dev Cheat Sheet

Quick reminders for local development:

```bash
# 🔧 Set up the virtual environment
python -m venv venv
venv\Scripts\activate        # (Windows)
source venv/bin/activate     # (Linux/Mac)

# 📦 Install dependencies
pip install -r requirements.txt

# 🧱 Make and apply migrations
python manage.py makemigrations
python manage.py migrate

# 👑 Create an admin superuser
python manage.py createsuperuser

# 🚀 Run the dev server
python manage.py runserver

# 🧼 Optional cleanup
python manage.py flush        # resets DB data
python manage.py collectstatic
```

💡 *Tip:* If you’re testing URL routing, run `python manage.py show_urls` (with Django extensions) to quickly see all available routes.

---

## 🧃 Closing Thoughts

Progress is steady — backend’s shaping up nicely, structure is clean, and we’ve got actual data flowing in this bad boii.
Next patch is all about linking tenants + making the UI less 2008 and more 2025 and even more backend shizzzz.

> “Not perfect, but it runs — and that’s a win in Django land.”

---

Would you like me to add **a quick “Known Bugs / Temporary Workarounds”** section too?
Those are great for devlogs like this — e.g. “Landing page 404s randomly,” “Dashboard redirect not wired yet,” etc.
