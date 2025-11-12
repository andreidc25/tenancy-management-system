import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 🔑 Auth & Routing
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

// 🏢 Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminProperties from "./pages/AdminProperties";
import AdminTenants from "./pages/AdminTenants";
import TenantProfilePage from "./pages/TenantProfilePage";
import AdminNotifications from "./pages/AdminNotifications";
import AdminReports from "./pages/AdminReports";
import AdminRegisterTenant from "./pages/AdminRegisterTenant";
import AdminRegisterProperty from "./pages/AdminRegisterProperty";
import AdminRegisterNotifications from "./pages/AdminRegisterNotifications";
import AdminPayments from "./pages/AdminPayments";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import AdminReportDetail from "./pages/AdminReportDetail";
import AdminPaymentDetail from "./pages/AdminPaymentDetail";

// 👤 Tenant Pages
import TenantDashboard from "./pages/TenantDashboard";
import TenantPropertyInfo from "./pages/TenantPropertyInfo";
import TenantProfile from "./pages/TenantProfile";
import TenantPayments from "./pages/TenantPayments";
import PaymentCash from "./pages/PaymentCash";
import PaymentOnline from "./pages/PaymentOnline";
import PaymentBank from "./pages/PaymentBank";
import TenantNotifications from "./pages/TenantNotification";
import TenantReports from "./pages/TenantReports";
import TenantRegisterReports from "./pages/TenantRegisterReports";
import TenantReportDetail from "./pages/TenantReportDetail";

function App() {
  return (
    <Routes>
      {/* 🏠 Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* 🧭 Redirect base admin/tenant paths to dashboards */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/tenant" element={<Navigate to="/tenant/dashboard" replace />} />

      {/* 🏢 ADMIN ROUTES */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/properties"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminProperties />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/properties/:id"
        element={
          <ProtectedRoute allowedRole="admin">
            <PropertyDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/properties/add"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminRegisterProperty />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tenants"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminTenants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tenants/:id"
        element={
          <ProtectedRoute allowedRole="admin">
            <TenantProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/tenants/add"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminRegisterTenant />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminPayments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/payments/:id"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminPaymentDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notifications/add"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminRegisterNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports/:id"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminReportDetail />
          </ProtectedRoute>
        }
      />

      {/* 👤 TENANT ROUTES */}
      <Route
        path="/tenant/dashboard"
        element={
          <ProtectedRoute allowedRole="tenant">
            <TenantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/property-info"
        element={
          <ProtectedRoute allowedRole="tenant">
            <TenantPropertyInfo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/profile"
        element={
          <ProtectedRoute allowedRole="tenant">
            <TenantProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/payments"
        element={
          <ProtectedRoute allowedRole="tenant">
            <TenantPayments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/payments/cash"
        element={
          <ProtectedRoute allowedRole="tenant">
            <PaymentCash />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/payments/online"
        element={
          <ProtectedRoute allowedRole="tenant">
            <PaymentOnline />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/payments/bank"
        element={
          <ProtectedRoute allowedRole="tenant">
            <PaymentBank />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/notifications"
        element={
          <ProtectedRoute allowedRole="tenant">
            <TenantNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/reports"
        element={
          <ProtectedRoute allowedRole="tenant">
            <TenantReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/reports/add"
        element={
          <ProtectedRoute allowedRole="tenant">
            <TenantRegisterReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenant/reports/:id"
        element={
          <ProtectedRoute allowedRole="tenant">
            <TenantReportDetail />
          </ProtectedRoute>
        }
      />

      {/* 🧩 Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
