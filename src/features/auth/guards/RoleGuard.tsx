import React from 'react';
import { usePermissionStore } from '../stores/permissionStore';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: string;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRole,
  fallback = null,
}) => {
  const { checkRole } = usePermissionStore();

  if (!checkRole(requiredRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}; 