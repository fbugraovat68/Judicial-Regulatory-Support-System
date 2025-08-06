import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { calendarService, type CreateEventRequest } from '@/features/calendar/services/calendarService';

export const useCalendar = () => {
  const queryClient = useQueryClient();

  const { data: events, isLoading, error } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: calendarService.getEvents,
  });

  const createEventMutation = useMutation({
    mutationFn: calendarService.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateEventRequest> }) =>
      calendarService.updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: calendarService.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    },
  });

  const markCompletedMutation = useMutation({
    mutationFn: calendarService.markEventCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar-events'] });
    },
  });

  return {
    events: events || [],
    isLoading,
    error,
    createEvent: createEventMutation.mutate,
    updateEvent: updateEventMutation.mutate,
    deleteEvent: deleteEventMutation.mutate,
    markCompleted: markCompletedMutation.mutate,
    isCreating: createEventMutation.isPending,
    isUpdating: updateEventMutation.isPending,
    isDeleting: deleteEventMutation.isPending,
    isMarkingCompleted: markCompletedMutation.isPending,
  };
}; 