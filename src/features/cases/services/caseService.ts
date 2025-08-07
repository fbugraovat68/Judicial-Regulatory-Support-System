import type { CaseDetails, CasesFilterCriteria } from '@/features/cases/types/case';
import type { PaginatedResponse } from '@/shared/types';
import api, { formDataApi } from '@/shared/utils/api';
import type { CaseRequest } from '../types/case-request';

const API_URL = '/api/v1/cases';

export const caseService = {
  // Get cases with filters and pagination
  getCases: async (filters?: CasesFilterCriteria): Promise<PaginatedResponse<CaseDetails>> => {
    const response = await api.get(API_URL, { params: filters });
    return response.data.payload;
  },

  // Get case by ID
  getCaseById: async (id: number): Promise<CaseDetails> => {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data.payload;
  },

  // Create new case
  createCase: async (caseData: FormData): Promise<CaseDetails> => {
    const response = await formDataApi.post(API_URL, caseData);
    return response.data.payload;
  },

  // Update case
  updateCase: async (id: number, caseData: CaseRequest): Promise<CaseDetails> => {
    const response = await api.put(`${API_URL}/${id}`, caseData);
    return response.data.payload;
  },

  // Delete case
  deleteCase: async (id: number): Promise<void> => {
    await api.delete(`${API_URL}/${id}`);
  }

}; 