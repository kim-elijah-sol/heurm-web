import { https } from '~/shared/lib';
import {
  getChallengeItemByDateResponseSchema,
  getChallengeResponseSchema,
  postHistoryResponseSchema,
} from './main.schema';
import type {
  GetChallengeItemByDateRequest,
  GetChallengeItemByDateResponse,
  GetChallengeResponse,
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
