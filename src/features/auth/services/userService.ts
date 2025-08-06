import api from '@/shared/utils/api';
import { API_CONSTANTS, STORAGE_KEYS } from '@/config';
import type { UserInfo } from '@/features/auth';

export interface UserRolesAndActions {
  actions: string[];
  roles: string[];
}

export const userService = {
  getUserInfo: (): UserInfo => {
    const appConfig = import.meta.env.VITE_APP_CONFIG || 
      (window as any).pjConfig || 
      (window as any).parent?.appConfig || 
      (window as any).parent?.pjConfig;
    
    if (appConfig) {
      try {
        const parsedConfig = JSON.parse(window.atob(appConfig));
        // Transform the parsed config to match UserInfo interface
        return {
          id: 1, // Default ID for portlet system
          email: parsedConfig.loggedInUserEmail || '',
          name: parsedConfig.name || parsedConfig.loggedInUserEmail || '',
          nameAr: parsedConfig.nameAr,
          language: parsedConfig.language || 'en',
          isAdmin: false, // Will be determined by roles
          loggedInUserEmail: parsedConfig.loggedInUserEmail || '',
          permissions: [],
          role: 'USER' as const,
          avatar: parsedConfig.avatar,
          lastLogin: parsedConfig.lastLogin,
          createdAt: parsedConfig.createdAt || new Date().toISOString(),
          updatedAt: parsedConfig.updatedAt || new Date().toISOString(),
        };
      } catch (error) {
        console.warn('Failed to parse app config:', error);
      }
    }
    
    // For development/testing, provide mock user info
    if (import.meta.env.DEV) {
      return { 
        id: 1,
        email: 'madarwish.c@stc.com.sa',
        name: 'Marwan Darwish',
        nameAr: 'مروان درويش',
        language: 'en',
        isAdmin: false,
        loggedInUserEmail: 'madarwish.c@stc.com.sa',
        permissions: [],
        role: 'USER',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    
    // Return minimal user info
    return { 
      id: 0,
      email: '',
      name: '',
      language: 'en',
      isAdmin: false,
      loggedInUserEmail: '',
      permissions: [],
      role: 'USER',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  getRoles: async (): Promise<UserRolesAndActions> => {
    const userInfo = userService.getUserInfo();

    const headers = {
      'application-name': API_CONSTANTS.APPLICATION_NAME,
      'email': userInfo.loggedInUserEmail || 'anonymous',
      'skipLoader': API_CONSTANTS.SKIP_LOADER
    };

    try {
      const [actionsResponse, rolesResponse] = await Promise.all([
        api.get('/users/logged-in/authorities', { headers }),
        api.get('/users/logged-in/roles', { headers })
      ]);

      return {
        actions: actionsResponse.data.payload || [],
        roles: rolesResponse.data.payload || []
      };
    } catch (error) {
      console.error('Failed to fetch roles and actions:', error);
      throw error;
    }
  },

  isLoggedIn: (): boolean => {
    // Check if user has roles or actions stored
    const tokenStorage = localStorage.getItem(STORAGE_KEYS.TOKEN_STORAGE);
    if (tokenStorage) {
      try {
        const tokenData = JSON.parse(tokenStorage);
        return !!(tokenData.state?.roles?.length > 0) || !!(tokenData.state?.actions?.length > 0);
      } catch {
        return false;
      }
    }
    return false;
  }
}; 