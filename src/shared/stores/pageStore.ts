import { create } from 'zustand';
import type { PageType } from '@/shared/constants/pages';
import { PAGES } from '@/shared/constants/pages';

interface PageState {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  previousPage: PageType | null;
  setPreviousPage: (page: PageType) => void;
}

export const usePageStore = create<PageState>((set) => ({
  activePage: PAGES.CASES,
  setActivePage: (page: PageType) => 
    set((state) => ({ 
      activePage: page, 
      previousPage: state.activePage 
    })),
  previousPage: null,
  setPreviousPage: (page: PageType) => set({ previousPage: page }),
})); 