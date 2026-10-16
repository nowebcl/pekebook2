import React, { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { isAdminAuthenticated } from '../../services/pocketbase';

export const AdminPage = ({ onNavigateToStore }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => isAdminAuthenticated());

  useEffect(() => {
    // Escuchar cambios de autenticación
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAuthenticated(true)}
        onBackToStore={onNavigateToStore}
      />
    );
  }

  return (
    <AdminDashboard
      onLogout={() => setIsAuthenticated(false)}
      onNavigateToStore={onNavigateToStore}
    />
  );
};
