import { useQuery } from '@tanstack/solid-query';
import { getProfile } from './user.api';

export const useProfileQuery = () =>
  useQuery(() => ({
    queryKey: ['profile'],
    queryFn: getProfile,
  }));
