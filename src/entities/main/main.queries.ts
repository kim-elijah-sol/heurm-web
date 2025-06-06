import { useQuery } from '@tanstack/solid-query';
import { getChallenge } from './main.api';

export const getChallengeQuery = () =>
  useQuery(() => ({
    queryKey: ['getChallenge'],
    queryFn: getChallenge,
  }));
