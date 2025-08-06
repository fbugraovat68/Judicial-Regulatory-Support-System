import type {
  CaseDetails, CasesFilterCriteria, CreateCaseRequest, UpdateCaseRequest,
  CaseNote, CaseDocument, CaseTeamMember, CaseJudgement, CaseEvent
} from '@/features/cases/types/case';
import type { PaginatedResponse } from '@/shared/types';
import api, { formDataApi } from '@/shared/utils/api';

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
  createCase: async (caseData: CreateCaseRequest): Promise<CaseDetails> => {
    const response = await api.post(API_URL, caseData);
    return response.data.payload;
  },

  // Update case
  updateCase: async (id: number, caseData: UpdateCaseRequest): Promise<CaseDetails> => {
    const response = await api.put(`${API_URL}/${id}`, caseData);
    return response.data.payload;
  },

  // Delete case
  deleteCase: async (id: number): Promise<void> => {
    await api.delete(`${API_URL}/${id}`);
  },

  // Upload document to case
  uploadDocument: async (caseId: number, file: File, description?: string): Promise<CaseDocument> => {
    const formData = new FormData();
    formData.append('file', file);
    if (description) formData.append('description', description);

    const response = await formDataApi.post(`${API_URL}/${caseId}/documents`, formData);
    return response.data.payload;
  },

  // Delete document from case
  deleteDocument: async (caseId: number, documentId: number): Promise<void> => {
    await api.delete(`${API_URL}/${caseId}/documents/${documentId}`);
  },

  // Add note to case
  addNote: async (caseId: number, note: { title: string; content: string; isPrivate?: boolean }): Promise<CaseNote> => {
    const response = await api.post(`${API_URL}/${caseId}/notes`, note);
    return response.data.payload;
  },

  // Update note
  updateNote: async (caseId: number, noteId: number, note: { title: string; content: string; isPrivate?: boolean }): Promise<CaseNote> => {
    const response = await api.put(`${API_URL}/${caseId}/notes/${noteId}`, note);
    return response.data.payload;
  },

  // Delete note
  deleteNote: async (caseId: number, noteId: number): Promise<void> => {
    await api.delete(`${API_URL}/${caseId}/notes/${noteId}`);
  },

  // Add judgement to case
  addJudgement: async (caseId: number, judgement: {
    title: string;
    content: string;
    courtName: string;
    judgeName: string;
    judgementDate: string;
    outcome: string;
    notes?: string;
  }): Promise<CaseJudgement> => {
    const response = await formDataApi.post(`${API_URL}/${caseId}/judgements`, judgement);
    return response.data.payload;
  },

  // Update judgement
  updateJudgement: async (caseId: number, judgementId: number, judgement: Partial<CaseJudgement>): Promise<CaseJudgement> => {
    const response = await api.put(`${API_URL}/${caseId}/judgements/${judgementId}`, judgement);
    return response.data.payload;
  },

  // Delete judgement
  deleteJudgement: async (caseId: number, judgementId: number): Promise<void> => {
    await api.delete(`${API_URL}/${caseId}/judgements/${judgementId}`);
  },

  // Add team member to case
  addTeamMember: async (caseId: number, member: { userId: number; role: string }): Promise<CaseTeamMember> => {
    const response = await api.post(`${API_URL}/${caseId}/team-members`, member);
    return response.data.payload;
  },

  // Update team member role
  updateTeamMember: async (caseId: number, memberId: number, role: string): Promise<CaseTeamMember> => {
    const response = await api.put(`${API_URL}/${caseId}/team-members/${memberId}`, { role });
    return response.data.payload;
  },

  // Remove team member from case
  removeTeamMember: async (caseId: number, memberId: number): Promise<void> => {
    await api.delete(`${API_URL}/${caseId}/team-members/${memberId}`);
  },

  // Add event to case
  addEvent: async (caseId: number, event: {
    title: string;
    description?: string;
    eventType: 'HEARING' | 'MEETING' | 'DEADLINE' | 'FILING' | 'OTHER';
    startDate: string;
    endDate?: string;
    location?: string;
    attendees?: string[];
  }): Promise<CaseEvent> => {
    const response = await api.post(`${API_URL}/${caseId}/events`, event);
    return response.data.payload;
  },

  // Update event
  updateEvent: async (caseId: number, eventId: number, event: Partial<CaseEvent>): Promise<CaseEvent> => {
    const response = await api.put(`${API_URL}/${caseId}/events/${eventId}`, event);
    return response.data.payload;
  },

  // Delete event
  deleteEvent: async (caseId: number, eventId: number): Promise<void> => {
    await api.delete(`${API_URL}/${caseId}/events/${eventId}`);
  },

  // Mark event as completed
  markEventCompleted: async (caseId: number, eventId: number): Promise<CaseEvent> => {
    const response = await api.patch(`${API_URL}/${caseId}/events/${eventId}/complete`);
    return response.data.payload;
  },

  // Get case events
  getCaseEvents: async (caseId: number): Promise<CaseEvent[]> => {
    const response = await api.get(`${API_URL}/${caseId}/events`);
    return response.data.payload;
  },

  // Get case notes
  getCaseNotes: async (caseId: number): Promise<CaseNote[]> => {
    const response = await api.get(`${API_URL}/${caseId}/notes`);
    return response.data.payload;
  },

  // Get case documents
  getCaseDocuments: async (caseId: number): Promise<CaseDocument[]> => {
    const response = await api.get(`${API_URL}/${caseId}/documents`);
    return response.data.payload;
  },

  // Get case team members
  getCaseTeamMembers: async (caseId: number): Promise<CaseTeamMember[]> => {
    const response = await api.get(`${API_URL}/${caseId}/team-members`);
    return response.data.payload;
  },

  // Get case judgements
  getCaseJudgements: async (caseId: number): Promise<CaseJudgement[]> => {
    const response = await api.get(`${API_URL}/${caseId}/judgements`);
    return response.data.payload;
  },

  // Export case data
  exportCase: async (caseId: number, format: 'PDF' | 'EXCEL' = 'PDF'): Promise<Blob> => {
    const response = await api.get(`${API_URL}/${caseId}/export`, {
      params: { format },
      responseType: 'blob',
    });
    return response.data.payload;
  }
}; 