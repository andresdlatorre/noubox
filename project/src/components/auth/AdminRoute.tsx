import React from 'react';
import { Navigate } from 'react-router-dom';
import useAppStore from '../../store';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, currentUser } = useAppStore();

  if (!isAuthenticated || !currentUser?.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;