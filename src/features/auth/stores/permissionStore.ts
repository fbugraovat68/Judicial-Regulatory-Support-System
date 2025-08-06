import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PermissionState {
  roles: string[];
  actions: string[];
  setRoles: (roles: string[]) => void;
  setActions: (actions: string[]) => void;
  checkRole: (role: string) => boolean;
  checkPermission: (permission: string) => boolean;
  clearPermissions: () => void;
}

export const usePermissionStore = create<PermissionState>()(
  persist(
    (set, get) => ({
      roles: [],
      actions: [],

      setRoles: (roles) => set({ roles }),

      setActions: (actions) => set({ actions }),

      checkRole: (role) => {
        const { roles } = get();
        return roles.includes(role);
      },

      checkPermission: (permission) => {
        const { actions } = get();
        return actions.includes(permission);
      },

      clearPermissions: () => set({ roles: [], actions: [] }),
    }),
    {
      name: 'permission-storage',
    }
  )
); 