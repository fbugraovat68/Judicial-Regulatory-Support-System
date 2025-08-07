import api from "@/shared/utils/api";
import type { CaseTeamMember } from "../types/case";

const API_URL = '/api/v1/cases';

export const teamMemberService = {

    // Get case team members
    getCaseTeamMembers: async (caseId: number): Promise<CaseTeamMember[]> => {
        const response = await api.get(`${API_URL}/${caseId}/team-members`);
        return response.data.payload;
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
    }
}