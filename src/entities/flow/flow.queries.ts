import { useMutation, useQuery } from '@tanstack/solid-query';
import { reconcile } from 'solid-js/store';
import { toastAtError } from '~/shared/fx';
import { flowApi } from '.';

export const getFlowQuery = () =>
  useQuery(() => ({
    queryKey: ['getFlow'],
    queryFn: () => flowApi.getFlow(),
    reconcile: (oldData, newData) => reconcile(newData)(oldData),
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

export const patchFlowMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof flowApi.patchFlow>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['patchFlow'],
    mutationFn: flowApi.patchFlow,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const deleteFlowMutation = (
  onSuccess?: (data: Awaited<ReturnType<typeof flowApi.deleteFlow>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['deleteFlow'],
    mutationFn: flowApi.deleteFlow,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
