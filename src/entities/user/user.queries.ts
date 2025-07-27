import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/solid-query';
import { deleteLogout, getUserProfile, patchUserProfile } from './user.api';

export const keys = createQueryKeys('user', {
  getUserProfile: ['getUserProfile'],
  patchUserProfile: ['patchUserProfile'],
  deleteLogout: ['deleteLogout'],
});

export const getUserProfileQuery = () =>
  useQuery(() => ({
    queryKey: keys.getUserProfile.queryKey,
    queryFn: getUserProfile,
  }));

export const patchUserProfileMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof patchUserProfile>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.patchUserProfile.queryKey,
    mutationFn: patchUserProfile,
    onSuccess,
  }));

export const logoutMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof deleteLogout>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.deleteLogout.queryKey,
    mutationFn: deleteLogout,
    onSuccess,
  }));
