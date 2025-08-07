import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { caseService } from "../services/caseService";
import type { CaseRequest } from "../types/case-request";

export const useCaseDetails = (id: number | null) => {
    const queryClient = useQueryClient();

    const { data: caseDetails, isLoading, error, refetch } = useQuery({
        queryKey: ['case', id],
        queryFn: () => caseService.getCaseById(id!),
        enabled: !!id,
        staleTime: 5 * 60 * 1000
    });

    const updateCaseMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: CaseRequest }) =>
            caseService.updateCase(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['case', id] });
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