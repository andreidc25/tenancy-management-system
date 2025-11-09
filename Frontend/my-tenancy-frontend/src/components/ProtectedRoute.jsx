import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    // No token found, redirect to login
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const isStaff = decoded.is_staff || decoded.isStaff || decoded.is_admin || false;
    
    // Check if user has correct role
    if (allowedRole === 'admin' && !isStaff) {
      return <Navigate to="/tenant" replace />;
    }
    if (allowedRole === 'tenant' && isStaff) {
      return <Navigate to="/admin" replace />;
    }

    // User has correct role, render the protected component
    return children;
  } catch (error) {
    console.error('Token validation failed:', error);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;