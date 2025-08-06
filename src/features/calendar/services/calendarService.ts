import api from '@/shared/utils/api';

export interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  date: string;
  type: 'meeting' | 'hearing' | 'deadline' | 'other';
  caseId?: number;
  caseName?: string;
  location?: string;
  attendees?: string[];
  isCompleted?: boolean;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  date: string;
  type: 'meeting' | 'hearing' | 'deadline' | 'other';
  caseId?: number;
  location?: string;
  attendees?: string[];
}

export const calendarService = {
  getEvents: async (): Promise<CalendarEvent[]> => {
    // For now, return mock data
    return [
      {
        id: 1,
        title: 'Court Hearing',
        description: 'Initial hearing for Contract Dispute case',
        date: '2024-01-20',
        type: 'hearing',
        caseId: 1,
        caseName: 'Contract Dispute',
        location: 'District Court',
        attendees: ['John Doe', 'Jane Smith'],
      },
      {
        id: 2,
        title: 'Client Meeting',
        description: 'Review case progress with client',
        date: '2024-01-22',
        type: 'meeting',
        caseId: 2,
        caseName: 'Employment Case',
        location: 'Office',
        attendees: ['Client Representative'],
      },
      {
        id: 3,
        title: 'Document Deadline',
        description: 'Submit final brief',
        date: '2024-01-25',
        type: 'deadline',
        caseId: 1,
        caseName: 'Contract Dispute',
      },
      {
        id: 4,
        title: 'Team Meeting',
        description: 'Weekly case review',
        date: '2024-01-23',
        type: 'meeting',
        location: 'Conference Room',
        attendees: ['Legal Team'],
      },
    ];
  },

  createEvent: async (eventData: CreateEventRequest): Promise<CalendarEvent> => {
    const response = await api.post('/calendar/events', eventData);
    return response.data;
  },

  updateEvent: async (id: number, eventData: Partial<CreateEventRequest>): Promise<CalendarEvent> => {
    const response = await api.put(`/calendar/events/${id}`, eventData);
    return response.data;
  },

  deleteEvent: async (id: number): Promise<void> => {
    await api.delete(`/calendar/events/${id}`);
  },

  markEventCompleted: async (id: number): Promise<void> => {
    await api.patch(`/calendar/events/${id}/complete`);
  },
}; 