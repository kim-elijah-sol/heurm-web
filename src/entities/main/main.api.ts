import { https } from '~/shared/lib';
import {
  getChallengeItemByDateResponseSchema,
  getChallengeResponseSchema,
} from './main.schema';
import {
  GetChallengeItemByDateRequest,
  GetChallengeItemByDateResponse,
  GetChallengeResponse,
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
