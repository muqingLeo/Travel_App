import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Checking authentication..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page while preserving the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;