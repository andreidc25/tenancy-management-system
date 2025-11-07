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
import TenantRegisterReports from "./pages/TenantRegisterReports";
import TenantPropertyInfo from "./pages/TenantPropertyInfo";
import TenantPayments from "./pages/TenantPayments";
import TenantNotifications from "./pages/TenantNotification";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import TenantReports from "./pages/TenantReports";
import AdminPayments from "./pages/AdminPayments";
import TenantProfile from "./pages/TenantProfile";
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
      <Route path="/admin/properties/:id" element={<PropertyDetailPage />} />
      <Route path="/admin/properties/add" element={<AdminRegisterProperty />} />
      <Route path="/admin/tenants" element={<AdminTenants />} />
      <Route path="/admin/tenants/add" element={<AdminRegisterTenant />} />
      <Route path="/admin/payments" element={<AdminPayments/>} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/notifications/add" element={<AdminRegisterNotifications />} />
      <Route path="/admin/reports" element={<AdminReports />} />
      {/* Placeholder Subpages for Tenant Section */}
      <Route path="/tenant/property-info" element={<TenantPropertyInfo />} />
      <Route path="/tenant/profile" element={<TenantProfile />} />
      <Route path="/tenant/payments" element={<TenantPayments />} />
      <Route path="/tenant/notifications" element={<TenantNotifications />} />
      <Route path="/tenant/reports" element={<TenantReports />} />
      <Route path="/tenant/reports/add" element={<TenantRegisterReports />} />

    </Routes>
  );
}

export default App;