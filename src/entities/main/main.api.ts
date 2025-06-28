import { https } from '~/shared/lib';
import {
  getChallengeResponseSchema,
  getHistoryResponseSchema,
  patchHistoryResponseSchema,
  postHistoryResponseSchema,
} from './main.schema';
import type {
  GetChallengeResponse,
  GetHistoryRequest,
  GetHistoryResponse,
  PatchHistoryRequest,
  PatchHistoryResponse,
  PostHistoryRequest,
  PostHistoryResponse,
} from './main.type';

export const getChallenge = () =>
  https
    .get<GetChallengeResponse>('/challenge')
    .then(https.validateResponse(getChallengeResponseSchema));

export const getHistory = (params: GetHistoryRequest) =>
  https
    .get<GetHistoryResponse>('/history', {
      params,
    })
    .then(https.validateResponse(getHistoryResponseSchema));

export const postHistory = (body: PostHistoryRequest) =>
  https
    .post<PostHistoryResponse>('/history', body)
    .then(https.validateResponse(postHistoryResponseSchema));

export const patchHistory = (body: PatchHistoryRequest) =>
  https
    .patch<PatchHistoryResponse>('/history', body)
    .then(https.validateResponse(patchHistoryResponseSchema));
