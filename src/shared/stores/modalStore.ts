import { create } from 'zustand';

interface ModalState {
  modals: Record<string, boolean>;
  open: (modalName: string) => void;
  close: (modalName: string) => void;
  isOpen: (modalName: string) => boolean;
  closeAll: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  modals: {},
  open: (modalName: string) => 
    set((state) => ({ 
      modals: { ...state.modals, [modalName]: true } 
    })),
  close: (modalName: string) => 
    set((state) => ({ 
      modals: { ...state.modals, [modalName]: false } 
    })),
  isOpen: (modalName: string) => get().modals[modalName] || false,
  closeAll: () => set({ modals: {} }),
})); 