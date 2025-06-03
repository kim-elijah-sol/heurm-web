import { useMutation, useQuery } from '@tanstack/solid-query';
import { getProfile, updateProfile } from './user.api';

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
