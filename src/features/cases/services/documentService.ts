import api, { formDataApi } from "@/shared/utils/api";
import type { CaseDocument, DownloadableFile } from "../types/case";

const API_URL = '/api/v1/cases';

export const documentService = {

    // Get case documents
    getCaseDocuments: async (caseId: number): Promise<CaseDocument[]> => {
        const response = await api.get(`${API_URL}/${caseId}/attachments`);
        return response.data.payload;
    },

    // Upload document to case
    uploadDocument: async (caseId: number, file: File, description?: string): Promise<CaseDocument> => {
        const formData = new FormData();
        formData.append('file', file);
        if (description) formData.append('description', description);

        const response = await formDataApi.post(`${API_URL}/${caseId}/attachments`, formData);
        return response.data.payload;
    },

    // Delete document from case
    deleteDocument: async (caseId: number, documentId: number): Promise<void> => {
        await api.delete(`${API_URL}/${caseId}/attachments/${documentId}`);
    },

    // Download document
    downloadDocument: async (caseId: number, documentId: number): Promise<DownloadableFile> => {
        const response = await api.get(`${API_URL}/${caseId}/attachments/${documentId}/download`);
        return response.data.payload;
    }
}