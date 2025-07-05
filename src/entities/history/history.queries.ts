import { useQuery } from '@tanstack/solid-query';
import { type Accessor } from 'solid-js';
import { reconcile } from 'solid-js/store';
import { historyApi, type HistoryType } from '.';

export const getHistoryQuery = (
  params: Accessor<HistoryType.GetHistoryRequest>
) =>
  useQuery(() => ({
    queryKey: ['getHistory', params().flowId],
    queryFn: () => historyApi.getHistory(params()),
    reconcile: (oldData, newData) => reconcile(newData)(oldData),
  }));
