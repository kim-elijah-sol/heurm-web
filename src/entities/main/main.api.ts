import { https } from '~/shared/lib';
import {
  getChallengeItemByDateResponseSchema,
  getChallengeResponseSchema,
  patchHistoryResponseSchema,
  postHistoryResponseSchema,
} from './main.schema';
import type {
  GetChallengeItemByDateRequest,
  GetChallengeItemByDateResponse,
  GetChallengeResponse,
  PatchHistoryRequest,
  PatchHistoryResponse,
  PostHistoryRequest,
  PostHistoryResponse,
} from './main.type';

export const getChallenge = () =>
  https
    .get<GetChallengeResponse>('/challenge')
    .then(https.validateResponse(getChallengeResponseSchema));

export const getChallengeItemByDate = (params: GetChallengeItemByDateRequest) =>
  https
    .get<GetChallengeItemByDateResponse>('/challenge/challenge-item/by-date', {
      params,
    })
    .then(https.validateResponse(getChallengeItemByDateResponseSchema));

export const postHistory = (body: PostHistoryRequest) =>
  https
    .post<PostHistoryResponse>('/history', body)
    .then(https.validateResponse(postHistoryResponseSchema));

export const patchHistory = (body: PatchHistoryRequest) =>
  https
    .patch<PatchHistoryResponse>('/history', body)
    .then(https.validateResponse(patchHistoryResponseSchema));
