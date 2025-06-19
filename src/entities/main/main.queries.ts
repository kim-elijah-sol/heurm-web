import { useMutation, useQuery } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { getChallenge, patchHistory, postHistory } from './main.api';

export const getChallengeQuery = () =>
  useQuery(() => ({
    queryKey: ['getChallenge'],
    queryFn: getChallenge,
  }));

export const postHistoryMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postHistory>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postHistory'],
    mutationFn: postHistory,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const patchHistoryMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof patchHistory>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['patchHistory'],
    mutationFn: patchHistory,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
