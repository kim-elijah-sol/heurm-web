import { useMutation, useQuery } from '@tanstack/solid-query';
import { Accessor } from 'solid-js';
import { toastAtError } from '~/shared/fx';
import {
  deleteChallenge,
  deleteChallengeItem,
  getChallengeItem,
  patchChallenge,
  patchChallengeItem,
  postChallengeItem,
} from './challenge-edit.api';
import { GetChallengeItemRequest } from './challenge-edit.type';

export const getChallengeItemQuery = (
  params: Accessor<GetChallengeItemRequest>
) =>
  useQuery(() => ({
    queryKey: ['getChallengeItem', params().challengeId],
    queryFn: () => getChallengeItem(params()),
  }));

export const patchChallengeMutation = () =>
  useMutation(() => ({
    mutationKey: ['patchChallenge'],
    mutationFn: patchChallenge,
  }));

export const deleteChallengeMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof deleteChallenge>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['deleteChallenge'],
    mutationFn: deleteChallenge,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const patchChallengeItemMutation = () =>
  useMutation(() => ({
    mutationKey: ['patchChallengeItem'],
    mutationFn: patchChallengeItem,
    onError: (error) => toastAtError(error),
  }));

export const postChallengeItemMutation = () =>
  useMutation(() => ({
    mutationKey: ['postChallengeItem'],
    mutationFn: postChallengeItem,
    onError: (error) => toastAtError(error),
  }));

export const deleteChallengeItemMutation = () =>
  useMutation(() => ({
    mutationKey: ['deleteChallengeItem'],
    mutationFn: deleteChallengeItem,
    onError: (error) => toastAtError(error),
  }));
