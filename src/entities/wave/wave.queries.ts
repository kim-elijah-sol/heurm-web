import { useMutation, useQuery } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { waveApi } from '.';

export const getWaveQuery = () =>
  useQuery(() => ({
    queryKey: ['getWave'],
    queryFn: () => waveApi.getWave(),
  }));

export const postWaveMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof waveApi.postWave>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postWave'],
    mutationFn: waveApi.postWave,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const patchWaveMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof waveApi.patchWave>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['patchWave'],
    mutationFn: waveApi.patchWave,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
