import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery } from '@tanstack/solid-query';
import { reconcile } from 'solid-js/store';
import { toastAtError } from '~/shared/fx';
import { flowApi } from '.';

export const keys = createQueryKeys('flow', {
  get: ['get'],
  post: ['post'],
  patch: ['patch'],
  delete: ['delete'],
});

export const getFlowQuery = () =>
  useQuery(() => ({
    queryKey: keys.get.queryKey,
    queryFn: () => flowApi.getFlow(),
    reconcile: (oldData, newData) => reconcile(newData)(oldData),
  }));

export const postFlowMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof flowApi.postFlow>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: flowApi.postFlow,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const patchFlowMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof flowApi.patchFlow>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.patch.queryKey,
    mutationFn: flowApi.patchFlow,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const deleteFlowMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof flowApi.deleteFlow>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.delete.queryKey,
    mutationFn: flowApi.deleteFlow,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
