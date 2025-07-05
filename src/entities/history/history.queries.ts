import { useMutation, useQuery } from '@tanstack/solid-query';
import { type Accessor } from 'solid-js';
import { reconcile } from 'solid-js/store';
import { toastAtError } from '~/shared/fx';
import { historyApi, type HistoryType } from '.';

export const getHistoryQuery = (
  params: Accessor<HistoryType.GetHistoryRequest>
) =>
  useQuery(() => ({
    queryKey: ['getHistory', params().flowId],
    queryFn: () => historyApi.getHistory(params()),
    reconcile: (oldData, newData) => reconcile(newData)(oldData),
  }));

export const postHistoryMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof historyApi.postHistory>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postHistory'],
    mutationFn: historyApi.postHistory,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
