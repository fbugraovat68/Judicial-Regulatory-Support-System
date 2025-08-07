import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { caseService } from '../services/caseService';
import { useFiltersStore } from '../stores/filtersStore';
import type { CaseRequest } from '../types/case-request';

export const useCases = () => {
  const queryClient = useQueryClient();
  const { filters, pageData } = useFiltersStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['cases', filters, pageData],
    queryFn: () => caseService.getCases({
      ...filters,
      page: pageData?.page - 1 || 0,
      size: pageData?.size || 7
    }),
    staleTime: 2 * 60 * 1000,
    enabled: true
  });

  const createCaseMutation = useMutation({
    mutationFn: caseService.createCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    }
  });

  const updateCaseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CaseRequest }) =>
      caseService.updateCase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    }
  });

  const deleteCaseMutation = useMutation({
    mutationFn: caseService.deleteCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    }
  });

  return {
    cases: data?.content || [],
    total: data?.totalElements || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.number || 1,
    pageSize: data?.size || 10,
    isLoading,
    error,
    refetch,

    // Mutations
    createCase: createCaseMutation.mutateAsync,
    updateCase: updateCaseMutation.mutateAsync,
    deleteCase: deleteCaseMutation.mutateAsync,

    // Loading states
    isCreating: createCaseMutation.isPending,
    isUpdating: updateCaseMutation.isPending,
    isDeleting: deleteCaseMutation.isPending
  };
};