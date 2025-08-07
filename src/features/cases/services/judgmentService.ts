import api, { formDataApi } from "@/shared/utils/api";
import type { CaseJudgement } from "../types/case";

const API_URL = '/api/v1/cases';

export const judgmentService = {

    // Get case judgements
    getCaseJudgements: async (caseId: number): Promise<CaseJudgement[]> => {
        const response = await api.get(`${API_URL}/${caseId}/judgements`);
        return response.data.payload;
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
    }
}