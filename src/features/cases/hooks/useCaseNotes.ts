import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { caseService } from "../services/caseService";

export const useCaseNotes = (caseId: number | null) => {
    const queryClient = useQueryClient  ();

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
        addNote: addNoteMutation.mutateAsync,
        updateNote: updateNoteMutation.mutateAsync,
        deleteNote: deleteNoteMutation.mutateAsync,
        isAdding: addNoteMutation.isPending,
        isUpdating: updateNoteMutation.isPending,
        isDeleting: deleteNoteMutation.isPending,
    };
}; 