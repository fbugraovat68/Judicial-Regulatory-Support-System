import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { LookupState, LookupAction, LookupItem, LookupTypes } from '../types/lookup';

// Initial state
const initialState: LookupState = {
  lookups: {},
  loading: {},
  cities: {},
  error: {}
};

// Reducer function
function lookupReducer(state: LookupState, action: LookupAction): LookupState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.loading
        }
      };

    case 'SET_LOOKUPS':
      return {
        ...state,
        lookups: {
          ...state.lookups,
          [action.payload.type]: action.payload.data
        },
        loading: {
          ...state.loading,
          [action.payload.type]: false
        },
        error: {
          ...state.error,
          [action.payload.type]: null
        }
      };

    case 'SET_CITIES':
      return {
        ...state,
        cities: {
          ...state.cities,
          [action.payload.districtId]: action.payload.cities
        }
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.type]: action.payload.error
        },
        loading: {
          ...state.loading,
          [action.payload.type]: false
        }
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.type]: null
        }
      };

    default:
      return state;
  }
}

// Context interface
interface LookupContextType {
  state: LookupState;
  dispatch: React.Dispatch<LookupAction>;
  getLookups: (type: LookupTypes) => LookupItem[];
  isLoading: (type: LookupTypes) => boolean;
  getError: (type: LookupTypes) => string | null;
  getCitiesByRegion: (districtId: number | null) => LookupItem[];
}

// Create context
const LookupContext = createContext<LookupContextType | undefined>(undefined);

// Provider component
interface LookupProviderProps {
  children: ReactNode;
}

export function LookupProvider({ children }: LookupProviderProps) {
  const [state, dispatch] = useReducer(lookupReducer, initialState);

  const getLookups = (type: LookupTypes): LookupItem[] => {
    return state.lookups[type] || [];
  };

  const isLoading = (type: LookupTypes): boolean => {
    return state.loading[type] || false;
  };

  const getError = (type: LookupTypes): string | null => {
    return state.error[type] || null;
  };

  const getCitiesByRegion = (districtId: number | null): LookupItem[] => {
    const cacheKey = districtId ? districtId.toString() : 'all';
    return state.cities[cacheKey] || [];
  };

  const value: LookupContextType = {
    state,
    dispatch,
    getLookups,
    isLoading,
    getError,
    getCitiesByRegion
  };

  return (
    <LookupContext.Provider value={value}>
      {children}
    </LookupContext.Provider>
  );
}

// Custom hook to use the context
export function useLookupContext() {
  const context = useContext(LookupContext);
  if (context === undefined) throw new Error('useLookupContext must be used within a LookupProvider');
  return context;
} 