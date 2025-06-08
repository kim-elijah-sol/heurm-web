import { https } from '~/shared/lib';
import {
  deleteChallengeResponseSchema,
  getChallengeItemResponseSchema,
  patchChallengeResponseSchema,
} from './challenge-edit.schema';
import {
  DeleteChallengeRequest,
  GetChallengeItemRequest,
  GetChallengeItemResponse,
  PatchChallengeRequest,
  PatchChallengeResponse,
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

export const patchChallenge = (body: PatchChallengeRequest) =>
  https.patch<PatchChallengeResponse>('/challenge', body).then((response) => {
    const parseResult = patchChallengeResponseSchema.safeParse(response.data);

    if (parseResult.success === false) {
      throw parseResult.error;
    }

    return response.data;
  });

export const deleteChallenge = (data: DeleteChallengeRequest) =>
  https
    .delete<PatchChallengeResponse>('/challenge', {
      data,
    })
    .then((response) => {
      const parseResult = deleteChallengeResponseSchema.safeParse(
        response.data
      );

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });
