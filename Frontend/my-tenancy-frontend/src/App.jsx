import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import TenantDashboard from "./pages/TenantDashboard";

function App() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<LoginPage />} />

      {/* Dashboards */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/tenant" element={<TenantDashboard />} />

      {/* Placeholder Subpages */}
      <Route path="/admin/properties" element={<div className="p-10">🏠 Properties Page</div>} />
      <Route path="/admin/tenants" element={<div className="p-10">👥 Tenants Page</div>} />
      <Route path="/admin/payments" element={<div className="p-10">💰 Payments Page</div>} />
      <Route path="/admin/notifications" element={<div className="p-10">🔔 Notifications Page</div>} />
      <Route path="/admin/reports" element={<div className="p-10">📄 Reports Page</div>} />

      {/* Placeholder Subpages for Tenant Section */}
      <Route path="/tenant/property-info" element={<div className="p-10">🏠 Property Info Page</div>} />
      <Route path="/tenant/profile" element={<div className="p-10">👤 Profile Page</div>} />
      <Route path="/tenant/payments" element={<div className="p-10">💳 Payments Page</div>} />
      <Route path="/tenant/notifications" element={<div className="p-10">🔔 Notifications Page</div>} />
      <Route path="/tenant/reports" element={<div className="p-10">📄 Reports Page</div>} />

    </Routes>
  );
}

export default App;
