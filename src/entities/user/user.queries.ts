import { useMutation, useQuery } from '@tanstack/solid-query';
import { deleteLogout, getUserProfile, patchUserProfile } from './user.api';

export const getUserProfileQuery = () =>
  useQuery(() => ({
    queryKey: ['getUserProfile'],
    queryFn: getUserProfile,
  }));

export const patchUserProfileMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof patchUserProfile>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['patchUserProfile'],
    mutationFn: patchUserProfile,
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
