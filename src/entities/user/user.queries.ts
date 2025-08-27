import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/solid-query';
import { userApi } from '.';

export const keys = createQueryKeys('user', {
  getUserProfile: ['getUserProfile'],
  patchUserProfile: ['patchUserProfile'],
  deleteLogout: ['deleteLogout'],
});

export const getUserProfileQuery = () =>
  useQuery(() => ({
    queryKey: keys.getUserProfile.queryKey,
    queryFn: userApi.getUserProfile,
  }));

export const patchUserProfileMutation = (
  onSuccess: (
    data: Awaited<ReturnType<typeof userApi.patchUserProfile>>
  ) => void
) =>
  useMutation(() => ({
    mutationKey: keys.patchUserProfile.queryKey,
    mutationFn: userApi.patchUserProfile,
    onSuccess,
  }));

export const logoutMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof userApi.deleteLogout>>) => void,
  onError: () => void
) =>
  useMutation(() => ({
    mutationKey: keys.deleteLogout.queryKey,
    mutationFn: userApi.deleteLogout,
    onSuccess,
    onError,
  }));
