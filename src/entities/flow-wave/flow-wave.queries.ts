import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { flowWaveApi } from '.';

export const postFlowWaveMutation = (
  onSuccess?: (
    data: Awaited<ReturnType<typeof flowWaveApi.postFlowWave>>
  ) => void
) =>
  useMutation(() => ({
    mutationKey: ['postFlowWave'],
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
    mutationKey: ['deleteFlowWave'],
    mutationFn: flowWaveApi.deleteFlowWave,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
