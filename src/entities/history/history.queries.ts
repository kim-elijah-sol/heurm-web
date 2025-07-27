import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/solid-query';
import { type Accessor } from 'solid-js';
import { reconcile } from 'solid-js/store';
import { toastAtError } from '~/shared/fx';
import { historyApi, type HistoryType } from '.';

export const keys = createQueryKeys('history', {
  get: (flowId: string) => ['get', flowId],
  post: ['post'],
  patch: ['patch'],
});

export const getHistoryQuery = (
  params: Accessor<HistoryType.GetHistoryRequest>
) =>
  useQuery(() => ({
    queryKey: keys.get(params().flowId).queryKey,
    queryFn: () => historyApi.getHistory(params()),
    reconcile: (oldData, newData) => reconcile(newData)(oldData),
  }));

export const postHistoryMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof historyApi.postHistory>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: historyApi.postHistory,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const patchHistoryMutation = (
  onSuccess?: (
    data: Awaited<ReturnType<typeof historyApi.patchHistory>>
  ) => void
) =>
  useMutation(() => ({
    mutationKey: keys.patch.queryKey,
    mutationFn: historyApi.patchHistory,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
