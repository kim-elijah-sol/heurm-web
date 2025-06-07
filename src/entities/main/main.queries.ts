import { useQuery } from '@tanstack/solid-query';
import { Accessor } from 'solid-js';
import { getChallenge, getChallengeItemByDate } from './main.api';
import { GetChallengeItemByDateRequest } from './main.type';

export const getChallengeQuery = () =>
  useQuery(() => ({
    queryKey: ['getChallenge'],
    queryFn: getChallenge,
  }));

export const getChallengeItemByDateQuery = (
  params: Accessor<GetChallengeItemByDateRequest>
) =>
  useQuery(() => ({
    queryKey: ['getChallengeItemByDate', params().challengeId, params().date],
    queryFn: () => getChallengeItemByDate(params()),
  }));
