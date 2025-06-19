import { https } from '~/shared/lib';
import {
  getChallengeResponseSchema,
  patchHistoryResponseSchema,
  postHistoryResponseSchema,
} from './main.schema';
import type {
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

export const postHistory = (body: PostHistoryRequest) =>
  https
    .post<PostHistoryResponse>('/history', body)
    .then(https.validateResponse(postHistoryResponseSchema));

export const patchHistory = (body: PatchHistoryRequest) =>
  https
    .patch<PatchHistoryResponse>('/history', body)
    .then(https.validateResponse(patchHistoryResponseSchema));
