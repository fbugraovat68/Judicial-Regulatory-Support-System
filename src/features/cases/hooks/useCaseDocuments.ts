import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { caseService } from "../services/caseService";

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
        uploadDocument: uploadDocumentMutation.mutateAsync,
        deleteDocument: deleteDocumentMutation.mutateAsync,
        isUploading: uploadDocumentMutation.isPending,
        isDeleting: deleteDocumentMutation.isPending,
    };
};