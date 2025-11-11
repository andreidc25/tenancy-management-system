import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const isStaff = decoded.is_staff || decoded.isStaff || decoded.is_admin || false;

    // ✅ Token expiration check
    const now = Date.now() / 1000;
    if (decoded.exp && decoded.exp < now) {
      console.warn("Token expired — logging out.");
      localStorage.clear();
      return <Navigate to="/" replace />;
    }

    // ✅ Role checks
    if (allowedRole === "admin" && !isStaff) {
      return <Navigate to="/tenant/dashboard" replace />;
    }
    if (allowedRole === "tenant" && isStaff) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
  } catch (error) {
    console.error("Token validation failed:", error);
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
