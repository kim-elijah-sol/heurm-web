import { useQuery } from '@tanstack/solid-query';
import { Accessor } from 'solid-js';
import { getChallengeItem } from './challenge-edit.api';
import { GetChallengeItemRequest } from './challenge-edit.type';

export const getChallengeItemQuery = (
  params: Accessor<GetChallengeItemRequest>
) =>
  useQuery(() => ({
    queryKey: ['getChallengeItem', params().challengeId],
    queryFn: () => getChallengeItem(params()),
  }));
