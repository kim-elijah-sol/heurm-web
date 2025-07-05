import { useMutation, useQuery } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { flowApi } from '.';

export const getFlowQuery = () =>
  useQuery(() => ({
    queryKey: ['getFlow'],
    queryFn: () => flowApi.getFlow(),
  }));

export const postFlowMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof flowApi.postFlow>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postFlow'],
    mutationFn: flowApi.postFlow,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
