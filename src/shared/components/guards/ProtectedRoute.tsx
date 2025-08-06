import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@/shared/components/common/LoadingSpinner';
import { usePermissionStore } from '@/features/auth/stores/permissionStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  isLoading?: boolean;
  isAuthenticated?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  isLoading = false,
  isAuthenticated = false
}) => {
  const userRoles = usePermissionStore((state) => state.roles);
  const userActions = usePermissionStore((state) => state.actions);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.some(permission =>
      userActions?.includes(permission)
    );
    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check roles
  if (requiredRoles.length > 0) {
    const hasRole = requiredRoles.some(role =>
      userRoles?.includes(role)
    );
    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}; 