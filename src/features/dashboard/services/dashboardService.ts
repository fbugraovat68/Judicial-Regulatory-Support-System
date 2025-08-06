import api from '@/shared/utils/api';

export interface DashboardData {
  totalCases: number;
  activeCases: number;
  completedCases: number;
  pendingCases: number;
  chartData: any[];
  recentCases: any[];
  upcomingEvents: any[];
}

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    // For now, return mock data
    return {
      totalCases: 150,
      activeCases: 45,
      completedCases: 85,
      pendingCases: 20,
      chartData: [
        { month: 'Jan', cases: 12 },
        { month: 'Feb', cases: 19 },
        { month: 'Mar', cases: 15 },
        { month: 'Apr', cases: 22 },
        { month: 'May', cases: 18 },
        { month: 'Jun', cases: 25 },
      ],
      recentCases: [
        {
          id: 1,
          number: 'CASE-001',
          name: 'Contract Dispute',
          clientName: 'ABC Corp',
          status: 'ACTIVE',
          createdAt: '2024-01-15',
        },
        {
          id: 2,
          number: 'CASE-002',
          name: 'Employment Case',
          clientName: 'XYZ Ltd',
          status: 'PENDING',
          createdAt: '2024-01-14',
        },
        {
          id: 3,
          number: 'CASE-003',
          name: 'Property Dispute',
          clientName: 'DEF Inc',
          status: 'COMPLETED',
          createdAt: '2024-01-13',
        },
      ],
      upcomingEvents: [
        {
          id: 1,
          title: 'Court Hearing',
          date: '2024-01-20',
          caseId: 1,
          caseName: 'Contract Dispute',
        },
        {
          id: 2,
          title: 'Client Meeting',
          date: '2024-01-22',
          caseId: 2,
          caseName: 'Employment Case',
        },
      ],
    };
  },

  getStatistics: async () => {
    const response = await api.get('/api/v1/dashboard/statistics');
    return response.data;
  },

  getChartData: async () => {
    const response = await api.get('/api/v1/dashboard/chart-data');
    return response.data;
  },
}; 