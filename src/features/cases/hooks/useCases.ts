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
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: true,
  });

  const createCaseMutation = useMutation({
    mutationFn: caseService.createCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });

  const updateCaseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CaseRequest }) =>
      caseService.updateCase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });

  const deleteCaseMutation = useMutation({
    mutationFn: caseService.deleteCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
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
    isDeleting: deleteCaseMutation.isPending,
  };
};

// Hook for single case
export const useCase = (id: number | null) => {
  const queryClient = useQueryClient();

  const { data: caseDetails, isLoading, error, refetch } = useQuery({
    queryKey: ['case', id],
    queryFn: () => caseService.getCaseById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const updateCaseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CaseRequest }) =>
      caseService.updateCase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case', id] });
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });

  const deleteCaseMutation = useMutation({
    mutationFn: caseService.deleteCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });

  return {
    case: caseDetails,
    isLoading,
    error,
    refetch,
    updateCase: updateCaseMutation.mutateAsync,
    deleteCase: deleteCaseMutation.mutateAsync,
    isUpdating: updateCaseMutation.isPending,
    isDeleting: deleteCaseMutation.isPending,
  };
};

// Hook for case documents
export const useCaseDocuments = (caseId: number | null) => {
  const queryClient = useQueryClient();

  const { data: documents, isLoading, error, refetch } = useQuery({
    queryKey: ['case-documents', caseId],
    queryFn: () => caseService.getCaseDocuments(caseId!),
    enabled: !!caseId,
  });

  const uploadDocumentMutation = useMutation({
    mutationFn: ({ file, description }: { file: File; description?: string }) =>
      caseService.uploadDocument(caseId!, file, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-documents', caseId] });
    },
  });

  const deleteDocumentMutation = useMutation({
    mutationFn: (documentId: number) => caseService.deleteDocument(caseId!, documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-documents', caseId] });
    },
  });

  return {
    documents: documents || [],
    isLoading,
    error,
    refetch,
    uploadDocument: uploadDocumentMutation.mutate,
    deleteDocument: deleteDocumentMutation.mutate,
    isUploading: uploadDocumentMutation.isPending,
    isDeleting: deleteDocumentMutation.isPending,
  };
};

// Hook for case notes
export const useCaseNotes = (caseId: number | null) => {
  const queryClient = useQueryClient();

  const { data: notes, isLoading, error, refetch } = useQuery({
    queryKey: ['case-notes', caseId],
    queryFn: () => caseService.getCaseNotes(caseId!),
    enabled: !!caseId,
  });

  const addNoteMutation = useMutation({
    mutationFn: (note: { title: string; content: string; isPrivate?: boolean }) =>
      caseService.addNote(caseId!, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-notes', caseId] });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: ({ noteId, note }: { noteId: number; note: { title: string; content: string; isPrivate?: boolean } }) =>
      caseService.updateNote(caseId!, noteId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-notes', caseId] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: number) => caseService.deleteNote(caseId!, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-notes', caseId] });
    },
  });

  return {
    notes: notes || [],
    isLoading,
    error,
    refetch,
    addNote: addNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    isAdding: addNoteMutation.isPending,
    isUpdating: updateNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
  };
}; 