import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { flowWaveApi } from '.';

export const keys = createQueryKeys('flow-wave', {
  post: ['post'],
  delete: ['delete'],
});

export const postFlowWaveMutation = (
  onSuccess?: (
    data: Awaited<ReturnType<typeof flowWaveApi.postFlowWave>>
  ) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: flowWaveApi.postFlowWave,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const deleteFlowWaveMutation = (
  onSuccess?: (
    data: Awaited<ReturnType<typeof flowWaveApi.deleteFlowWave>>
  ) => void
) =>
  useMutation(() => ({
    mutationKey: keys.delete.queryKey,
    mutationFn: flowWaveApi.deleteFlowWave,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
