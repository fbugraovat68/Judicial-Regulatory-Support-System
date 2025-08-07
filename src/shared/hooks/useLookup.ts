import { useCallback, useEffect, useRef } from 'react';
import { useLookupContext } from '../contexts/LookupContext';
import { LookupTypes, type Consultant, type Litigant } from '../types/lookup';
import { lookupService } from '../services/lookupService';

export function useLookup() {
    const { state, dispatch, getLookups, isLoading, getError, getCitiesByRegion } = useLookupContext();
    
    // Track ongoing requests to prevent duplicates
    const ongoingRequests = useRef<Set<LookupTypes>>(new Set());

    // Fetch lookups by type
    const fetchLookups = useCallback(async (type: LookupTypes) => {
        const isCurrentlyLoading = isLoading(type);
        const hasData = !!state.lookups[type];
        const isRequestOngoing = ongoingRequests.current.has(type);

        // Only fetch if not currently loading, no data exists, and no ongoing request
        if (!isCurrentlyLoading && !hasData && !isRequestOngoing) {
            ongoingRequests.current.add(type);
            dispatch({ type: 'SET_LOADING', payload: { type, loading: true } });

            try {
                const data = await lookupService.getLookups(type);
                dispatch({ type: 'SET_LOOKUPS', payload: { type, data } });
            } catch (error) {
                dispatch({
                    type: 'SET_ERROR',
                    payload: { type, error: error instanceof Error ? error.message : 'Unknown error' }
                });
            } finally {
                ongoingRequests.current.delete(type);
            }
        }
    }, [isLoading, dispatch, state.lookups]);

    // Fetch cities by region
    const fetchCitiesByRegion = useCallback(async (districtId: number | null) => {
        const cacheKey = districtId ? districtId.toString() : 'all';
        const cachedCities = state.cities[cacheKey];

        if (!cachedCities) {
            try {
                const cities = await lookupService.getCitiesByRegion(districtId);
                dispatch({ type: 'SET_CITIES', payload: { districtId: cacheKey, cities } });
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        }
    }, [state.cities, dispatch]);

    // Search consultants
    const searchConsultants = useCallback(async (query: string, limit: number = 999): Promise<Consultant[]> => {
        try {
            return await lookupService.getConsultants(query, limit);
        } catch (error) {
            console.error('Error searching consultants:', error);
            return [];
        }
    }, []);

    // Search litigants
    const searchLitigants = useCallback(async (query: string, limit: number = 999): Promise<Litigant[]> => {
        try {
            debugger
            return await lookupService.getLitigants(query, limit);
        } catch (error) {
            console.error('Error searching litigants:', error);
            return [];
        }
    }, []);

    // Search users
    const searchUsers = useCallback(async (query: string, limit: number = 999): Promise<Consultant[]> => {
        try {
            return await lookupService.getUsers(query, limit);
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    }, []);

    return {
        // State
        lookups: state.lookups,
        loading: state.loading,
        error: state.error,

        // Getters
        getLookups,
        isLoading,
        getError,
        getCitiesByRegion,

        // Actions
        fetchLookups,
        fetchCitiesByRegion,
        searchConsultants,
        searchLitigants,
        searchUsers
    };
}

// Specialized hooks for specific lookup types
export function useCaseTypes() {
    const { fetchLookups, getLookups, isLoading, getError } = useLookup();

    useEffect(() => {
        console.log('useCaseTypes');
        fetchLookups(LookupTypes.CaseType);
    }, [fetchLookups]);

    return {
        caseTypes: getLookups(LookupTypes.CaseType),
        loading: isLoading(LookupTypes.CaseType),
        error: getError(LookupTypes.CaseType)
    };
}

export function useInternalClients() {
    const { fetchLookups, getLookups, isLoading, getError } = useLookup();

    useEffect(() => {
        fetchLookups(LookupTypes.InternalClient);
    }, [fetchLookups]);

    return {
        internalClients: getLookups(LookupTypes.InternalClient),
        loading: isLoading(LookupTypes.InternalClient),
        error: getError(LookupTypes.InternalClient)
    };
}

export function useRegions() {
    const { fetchLookups, getLookups, isLoading, getError } = useLookup();

    useEffect(() => {
        fetchLookups(LookupTypes.District);
    }, [fetchLookups]);

    return {
        regions: getLookups(LookupTypes.District),
        loading: isLoading(LookupTypes.District),
        error: getError(LookupTypes.District)
    };
}

export function useCourts() {
    const { fetchLookups, getLookups, isLoading, getError } = useLookup();

    useEffect(() => {
        fetchLookups(LookupTypes.Courts);
    }, [fetchLookups]);

    return {
        courts: getLookups(LookupTypes.Courts),
        loading: isLoading(LookupTypes.Courts),
        error: getError(LookupTypes.Courts)
    };
}

export function useStates() {
    const { fetchLookups, getLookups, isLoading, getError } = useLookup();

    useEffect(() => {
        fetchLookups(LookupTypes.States);
    }, [fetchLookups]);

    return {
        states: getLookups(LookupTypes.States),
        loading: isLoading(LookupTypes.States),
        error: getError(LookupTypes.States)
    };
}