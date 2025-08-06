import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CasesFilterCriteria } from '@/features/cases/types/case';

export interface PageData {
  page: number;
  size: number;
}

interface FiltersState {
  filters: CasesFilterCriteria;
  pageData: PageData;
  setFilters: (filters: CasesFilterCriteria) => void;
  updateFilters: (newFilters: Partial<CasesFilterCriteria>) => void;
  resetFilters: () => void;
  setPageData: (pageData: PageData) => void;
}

export const useFiltersStore = create<FiltersState>()(
  devtools(
    (set) => ({
      filters: {
        size: 7,
        page: 1,
        searchKey: null,
        sort: null,
        fromPeriod: undefined,
        toPeriod: undefined,
        finalResultId: undefined,
        lawsuitTypeId: undefined,
        courtId: undefined,
        state: null
      },
      pageData: { page: 1, size: 7 },

      setFilters: (filters) => set({ filters }),

      updateFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          pageData: { ...state.pageData, page: 1 }
        }));
      },

      resetFilters: () => set({ 
        filters: {
          size: 7,
          page: 1,
          searchKey: null,
          sort: null,
          fromPeriod: undefined,
          toPeriod: undefined,
          finalResultId: undefined,
          lawsuitTypeId: undefined,
          courtId: undefined,
          state: null
        }, 
        pageData: { page: 1, size: 7 } 
      }),

      setPageData: (pageData) => set({ pageData }),
    }),
    { name: 'filters-store' }
  )
); 