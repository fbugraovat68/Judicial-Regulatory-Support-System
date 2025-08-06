import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/features/dashboard/services/dashboardService';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 