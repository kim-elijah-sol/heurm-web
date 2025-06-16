import { useMutation, useQuery } from '@tanstack/solid-query';
import { type Accessor } from 'solid-js';
import { toastAtError } from '~/shared/fx';
import {
  getChallenge,
  getChallengeItemByDate,
  getChallengeOverview,
  getHistoryByWeek,
  patchHistory,
  postHistory,
} from './main.api';
import type {
  GetChallengeItemByDateRequest,
  GetChallengeOverviewRequest,
  GetHistoryByWeekRequest,
} from './main.type';

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

export const postHistoryMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postHistory>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postHistory'],
    mutationFn: postHistory,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const patchHistoryMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof patchHistory>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['patchHistory'],
    mutationFn: patchHistory,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const getChallengeOverviewQuery = (
  params: Accessor<GetChallengeOverviewRequest>
) =>
  useQuery(() => ({
    queryKey: ['getChallengeOverview', params().date],
    queryFn: () => getChallengeOverview(params()),
  }));

export const getHistoryByWeekQuery = (
  params: Accessor<GetHistoryByWeekRequest>
) =>
  useQuery(() => ({
    queryKey: ['getHistoryByWeek', params().start, params().end],
    queryFn: () => getHistoryByWeek(params()),
  }));
