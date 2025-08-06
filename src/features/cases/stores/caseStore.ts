import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { CaseDetails } from '@/features/cases/types/case';

interface CaseState {
  selectedCase: CaseDetails | null;
  selectedCaseId: number | null;
  setSelectedCase: (details: CaseDetails | null) => void;
  setSelectedCaseId: (id: number | null) => void;
}

export const useCaseStore = create<CaseState>()(
  devtools(
    (set) => ({
      selectedCase: null,
      selectedCaseId: null,

      setSelectedCase: (caseDetails: CaseDetails | null) => {
        set({ 
          selectedCase: caseDetails,
          selectedCaseId: caseDetails?.id || null 
        });
      },

      setSelectedCaseId: (id: number | null) => {
        set({ selectedCaseId: id });
      },
    }),
    { name: 'case-store' }
  )
); 