import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/solid-query';
import { reconcile } from 'solid-js/store';
import { toastAtError } from '~/shared/fx';
import { waveApi } from '.';

export const keys = createQueryKeys('wave', {
  get: ['get'],
  post: ['post'],
  patch: ['patch'],
  delete: ['delete'],
  reorder: ['reorder'],
});

export const getWaveQuery = () =>
  useQuery(() => ({
    queryKey: keys.get.queryKey,
    queryFn: () => waveApi.getWave(),
    reconcile: (oldData, newData) => reconcile(newData)(oldData),
  }));

export const postWaveMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof waveApi.postWave>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: waveApi.postWave,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const patchWaveMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof waveApi.patchWave>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.patch.queryKey,
    mutationFn: waveApi.patchWave,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const deleteWaveMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof waveApi.deleteWave>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.delete.queryKey,
    mutationFn: waveApi.deleteWave,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const reorderWaveMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof waveApi.reorderWave>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.reorder.queryKey,
    mutationFn: waveApi.reorderWave,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
