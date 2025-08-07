import { LookupTypes, type LookupItem, type Consultant, type Litigant } from '../types/lookup';
import api from '../utils/api';

export const lookupService = {

    // Get lookups by type
    getLookups: async (type: LookupTypes): Promise<LookupItem[]> => {
        try {
            const params = new URLSearchParams({ types: type });
            const response = await api.get(`/api/v1/lookups?${params}`, { headers: { skipLoader: 'yes' } });
            
            // Handle different response structures
            let data = response.data;
            if (data && data.payload) {
                data = data.payload;
            }
            
            // Ensure we return an array
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching lookups:', error);
            return [];
        }
    },

    // Get cities by region
    getCitiesByRegion: async (districtId: number | null): Promise<LookupItem[]> => {
        try {
            const params = new URLSearchParams({ types: LookupTypes.City });
            if (districtId) params.append('districtId', districtId.toString());
            const response = await api.get(`/api/v1/lookups?${params}`, { headers: { skipLoader: 'yes' } });
            
            // Handle different response structures
            let data = response.data;
            if (data && data.payload) {
                data = data.payload;
            }
            
            // Ensure we return an array
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching cities:', error);
            return [];
        }
    },

    // Search litigants
    getLitigants: async (query: string, limit: number = 999): Promise<Litigant[]> => {
        try {
            debugger
            const criteria = query ? { query, limit } : { size: 10, page: 0 };
            const params = new URLSearchParams(criteria as any);
            const endpoint = query ? '/search' : '';
            const response = await api.get(`/api/v1/litigants${endpoint}?${params}`, { headers: { skipLoader: 'yes' } });
            
            // Handle different response structures
            let data = response.data;
            if (data && data.payload) {
                data = data.payload;
            }
            
            // Ensure we return an array
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error searching litigants:', error);
            return [];
        }
    },

    // Search consultants
    getConsultants: async (query: string, limit: number = 999): Promise<Consultant[]> => {
        try {
            const criteria = query ? { query, limit } : { size: 10, page: 0 };
            const params = new URLSearchParams(criteria as any);
            const endpoint = query ? '/search' : '';
            const response = await api.get(`/api/v1/consultants${endpoint}?${params}`, { headers: { skipLoader: 'yes' } });
            
            // Handle different response structures
            let data = response.data;
            if (data && data.payload) {
                data = data.payload;
            }
            
            // Ensure we return an array
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error searching consultants:', error);
            return [];
        }
    },

    // Search users
    getUsers: async (query: string, limit: number = 999): Promise<Consultant[]> => {
        try {
            const criteria = query ? { query, limit } : { size: 10, page: 0 };
            const params = new URLSearchParams(criteria as any);
            const endpoint = query ? '/search' : '';
            const response = await api.get(`/api/v1/users${endpoint}?${params}`, { headers: { skipLoader: 'yes' } });
            
            // Handle different response structures
            let data = response.data;
            if (data && data.payload) {
                data = data.payload;
            }
            
            // Ensure we return an array
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    }
}