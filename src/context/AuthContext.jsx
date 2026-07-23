// src/context/AuthContext.jsx - Admin Auth State Management

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('hys_token') || null);
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('hys_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (tokenData, adminData) => {
    setToken(tokenData);
    setAdmin(adminData);
    localStorage.setItem('hys_token', tokenData);
    localStorage.setItem('hys_admin', JSON.stringify(adminData));
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('hys_token');
    localStorage.removeItem('hys_admin');
  };

  const getAuthHeaders = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider value={{ token, admin, isAuthenticated: !!token, login, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
