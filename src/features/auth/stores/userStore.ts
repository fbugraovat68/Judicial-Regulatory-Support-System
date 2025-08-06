import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserInfo } from '@/features/auth';
import { STORAGE_KEYS } from '@/config';

interface UserState {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  updateLanguage: (language: 'en' | 'ar') => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,

      setUserInfo: (userInfo) => set({ userInfo }),

      updateLanguage: (language: 'en' | 'ar') => 
        set((state) => ({
          userInfo: state.userInfo 
            ? { ...state.userInfo, language }
            : null
        })),
    }),
    {
      name: STORAGE_KEYS.USER_STORAGE,
      partialize: (state) => ({ 
        userInfo: state.userInfo
      }),
    }
  )
); 