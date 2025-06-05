import { useMutation, useQuery } from '@tanstack/solid-query';
import { deleteLogout, getProfile, updateProfile } from './user.api';

export const useProfileQuery = () =>
  useQuery(() => ({
    queryKey: ['profile'],
    queryFn: getProfile,
  }));

export const useProfileMutation = (onSuccess: () => void) =>
  useMutation(() => ({
    mutationKey: ['updateProfile'],
    mutationFn: updateProfile,
    onSuccess,
  }));

export const logoutMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof deleteLogout>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['deleteLogout'],
    mutationFn: deleteLogout,
    onSuccess,
  }));
