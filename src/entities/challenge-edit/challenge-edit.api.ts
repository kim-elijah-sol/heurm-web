import { https } from '~/shared/lib';
import { getChallengeItemResponseSchema } from './challenge-edit.schema';
import {
  GetChallengeItemRequest,
  GetChallengeItemResponse,
} from './challenge-edit.type';

export const getChallengeItem = (params: GetChallengeItemRequest) =>
  https
    .get<GetChallengeItemResponse>('/challenge/challenge-item', {
      params,
    })
    .then((response) => {
      const parseResult = getChallengeItemResponseSchema.safeParse(
        response.data
      );

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });
