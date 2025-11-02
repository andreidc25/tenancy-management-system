import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import TenantDashboard from "./pages/TenantDashboard";
import AdminProperties from "./pages/AdminProperties";
import AdminTenants from "./pages/AdminTenants";
import AdminNotifications from "./pages/AdminNotifications";
import AdminReports from "./pages/AdminReports";
import AdminRegisterTenant from "./pages/AdminRegisterTenant";
import AdminRegisterProperty from "./pages/AdminRegisterProperty";
import AdminRegisterNotifications from "./pages/AdminRegisterNotifications";
import AdminRegisterReports from "./pages/AdminRegisterReports";
import TenantPropertyInfo from "./pages/TenantPropertyInfo";
import TenantPayments from "./pages/TenantPayments";
import TenantNotifications from "./pages/TenantNotification";

function App() {
  return (
    


    <Routes>
      {/* Login Page */}
      <Route path="/" element={<LoginPage />} />

      {/* Dashboards */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/tenant" element={<TenantDashboard />} />

      {/* Placeholder Subpages */}
      <Route path="/admin/properties" element={<AdminProperties />} />
      <Route path="/admin/properties/add" element={<AdminRegisterProperty />} />
      <Route path="/admin/tenants" element={<AdminTenants />} />
      <Route path="/admin/tenants/add" element={<AdminRegisterTenant />} />
      <Route path="/admin/payments" element={<div className="p-10">💰 Payments Page</div>} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/notifications/add" element={<AdminRegisterNotifications />} />
      <Route path="/admin/reports" element={<AdminReports />} />
      <Route path="/admin/reports/add" element={<AdminRegisterReports />} />
      {/* Placeholder Subpages for Tenant Section */}
      <Route path="/tenant/property-info" element={<TenantPropertyInfo />} />
      <Route path="/tenant/profile" element={<div className="p-10">👤 Profile Page</div>} />
      <Route path="/tenant/payments" element={<TenantPayments />} />
      <Route path="/tenant/notifications" element={<TenantNotifications />} />
      <Route path="/tenant/reports" element={<div className="p-10">📄 Reports Page</div>} />

    </Routes>
  );
}

export default App;