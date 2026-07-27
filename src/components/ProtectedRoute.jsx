// src/components/ProtectedRoute.jsx - Protected Route Wrapper

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, admin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Admin access control based on roles
  if (allowedRoles && admin && !allowedRoles.includes(admin.role)) {
    // Redirect to dashboard if they don't have permission for this route
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};
