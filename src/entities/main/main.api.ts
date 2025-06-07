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
  https.get<GetChallengeResponse>('/challenge').then((response) => {
    const parseResult = getChallengeResponseSchema.safeParse(response.data);

    if (parseResult.success === false) {
      throw parseResult.error;
    }

    return response.data;
  });

export const getChallengeItemByDate = (params: GetChallengeItemByDateRequest) =>
  https
    .get<GetChallengeItemByDateResponse>('/challenge/challenge-item/by-date', {
      params,
    })
    .then((response) => {
      const parseResult = getChallengeItemByDateResponseSchema.safeParse(
        response.data
      );

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });
