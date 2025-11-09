import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import TenantDashboard from "./pages/TenantDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
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
      {/* Public Routes */}
      <Route path="/" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/properties" element={
        <ProtectedRoute allowedRole="admin">
          <AdminProperties />
        </ProtectedRoute>
      } />
      <Route path="/admin/properties/:id" element={
        <ProtectedRoute allowedRole="admin">
          <PropertyDetailPage />
        </ProtectedRoute>
      } />
      <Route path="/admin/properties/add" element={
        <ProtectedRoute allowedRole="admin">
          <AdminRegisterProperty />
        </ProtectedRoute>
      } />
      <Route path="/admin/tenants" element={
        <ProtectedRoute allowedRole="admin">
          <AdminTenants />
        </ProtectedRoute>
      } />
      <Route path="/admin/tenants/add" element={
        <ProtectedRoute allowedRole="admin">
          <AdminRegisterTenant />
        </ProtectedRoute>
      } />
      <Route path="/admin/payments" element={
        <ProtectedRoute allowedRole="admin">
          <AdminPayments />
        </ProtectedRoute>
      } />
      <Route path="/admin/notifications" element={
        <ProtectedRoute allowedRole="admin">
          <AdminNotifications />
        </ProtectedRoute>
      } />
      <Route path="/admin/notifications/add" element={
        <ProtectedRoute allowedRole="admin">
          <AdminRegisterNotifications />
        </ProtectedRoute>
      } />
      <Route path="/admin/reports" element={
        <ProtectedRoute allowedRole="admin">
          <AdminReports />
        </ProtectedRoute>
      } />

      {/* Tenant Routes */}
      <Route path="/tenant" element={
        <ProtectedRoute allowedRole="tenant">
          <TenantDashboard />
        </ProtectedRoute>
      } />
      <Route path="/tenant/property-info" element={
        <ProtectedRoute allowedRole="tenant">
          <TenantPropertyInfo />
        </ProtectedRoute>
      } />
      <Route path="/tenant/profile" element={
        <ProtectedRoute allowedRole="tenant">
          <TenantProfile />
        </ProtectedRoute>
      } />
      <Route path="/tenant/payments" element={
        <ProtectedRoute allowedRole="tenant">
          <TenantPayments />
        </ProtectedRoute>
      } />
      <Route path="/tenant/notifications" element={
        <ProtectedRoute allowedRole="tenant">
          <TenantNotifications />
        </ProtectedRoute>
      } />
      <Route path="/tenant/reports" element={
        <ProtectedRoute allowedRole="tenant">
          <TenantReports />
        </ProtectedRoute>
      } />
      <Route path="/tenant/reports/add" element={
        <ProtectedRoute allowedRole="tenant">
          <TenantRegisterReports />
        </ProtectedRoute>
      } />

    </Routes>
  );
}

export default App;