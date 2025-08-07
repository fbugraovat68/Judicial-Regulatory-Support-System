import api from "@/shared/utils/api";
import type { CaseNote } from "../types/case";

const API_URL = '/api/v1/cases';

export const noteService = {

    // Get case notes
    getCaseNotes: async (caseId: number): Promise<CaseNote[]> => {
        const response = await api.get(`${API_URL}/${caseId}/notes`);
        return response.data.payload;
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
    }
}   