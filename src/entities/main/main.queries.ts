import { useMutation, useQuery } from '@tanstack/solid-query';
import { type Accessor } from 'solid-js';
import { reconcile } from 'solid-js/store';
import { toastAtError } from '~/shared/fx';
import {
  getChallenge,
  getHistory,
  patchHistory,
  postHistory,
} from './main.api';
import { GetHistoryRequest } from './main.type';

export const getChallengeQuery = () =>
  useQuery(() => ({
    queryKey: ['getChallenge'],
    queryFn: getChallenge,
    reconcile: (oldData, newData) => reconcile(newData)(oldData),
  }));

export const getHistoryQuery = (params: Accessor<GetHistoryRequest>) =>
  useQuery(() => ({
    queryKey: ['getHistory', params().challengeId, params().challengeItemId],
    queryFn: () => getHistory(params()),
    reconcile: (oldData, newData) => reconcile(newData)(oldData),
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
