import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { useUserStore } from '../stores/userStore';
import { usePermissionStore } from '../stores/permissionStore';

export const useUser = () => {
    const { setUserInfo } = useUserStore();
    const { setRoles, setActions, roles, actions } = usePermissionStore();

    const { data: userInfo, isLoading: userLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: userService.getUserInfo,
    });

    const { data: userRolesAndActions, isLoading: rolesLoading, error: rolesError } = useQuery({
        queryKey: ['userRoles'],
        queryFn: userService.getRoles,
        enabled: !!userInfo?.loggedInUserEmail,
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });

    // Handle user info success - only update if changed
    useEffect(() => userInfo && setUserInfo(userInfo), [userInfo, setUserInfo]);

    // Handle user roles success - only update if changed
    useEffect(() => userRolesAndActions && setRoles(userRolesAndActions.roles) && setActions(userRolesAndActions.actions), [userRolesAndActions, setRoles, setActions]);

    // Check if user is authenticated based on having roles and permissions
    const isAuthenticated = useMemo(() => !!(roles && roles.length > 0) || !!(actions && actions.length > 0), [roles, actions]);

    return {
        userInfo,
        userRolesAndActions,
        isLoading: userLoading || rolesLoading,
        isAuthenticated,
        error: rolesError,
    };
}; 