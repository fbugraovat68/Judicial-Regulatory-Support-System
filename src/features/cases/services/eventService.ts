import api from "@/shared/utils/api";
import type { CaseEvent } from "../types/case";

const API_URL = '/api/v1/cases';

export const eventService = {

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
}