import React from 'react';
import { usePermissionStore } from '../stores/permissionStore';

interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
  fallback = null
}) => {
  const { checkPermission } = usePermissionStore();

  if (!checkPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}; 