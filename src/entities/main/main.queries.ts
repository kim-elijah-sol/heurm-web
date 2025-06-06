import { useQuery } from '@tanstack/solid-query';
import { getChallenge } from './main.api';

export const challengeQuery = () =>
  useQuery(() => ({
    queryKey: ['getChallenge'],
    queryFn: getChallenge,
  }));
