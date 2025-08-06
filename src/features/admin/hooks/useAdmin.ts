import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService, type User } from '@/features/admin/services/adminService';

export const useAdmin = () => {
  const queryClient = useQueryClient();

  const { data: adminData, isLoading, error } = useQuery({
    queryKey: ['admin-data'],
    queryFn: adminService.getAdminData,
  });

  const createUserMutation = useMutation({
    mutationFn: adminService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-data'] });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      adminService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-data'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: adminService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-data'] });
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: ({ id, value }: { id: number; value: string }) =>
      adminService.updateSetting(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-data'] });
    },
  });

  return {
    adminData,
    isLoading,
    error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    updateSetting: updateSettingMutation.mutate,
    isCreatingUser: createUserMutation.isPending,
    isUpdatingUser: updateUserMutation.isPending,
    isDeletingUser: deleteUserMutation.isPending,
    isUpdatingSetting: updateSettingMutation.isPending,
  };
}; 