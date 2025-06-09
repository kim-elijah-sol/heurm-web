import { https } from '~/shared/lib';
import {
  deleteChallengeResponseSchema,
  getChallengeItemResponseSchema,
  patchChallengeItemResponseSchema,
  patchChallengeResponseSchema,
  postChallengeItemResponseSchema,
} from './challenge-edit.schema';
import {
  DeleteChallengeRequest,
  DeleteChallengeResponse,
  GetChallengeItemRequest,
  GetChallengeItemResponse,
  PatchChallengeItemRequest,
  PatchChallengeItemResponse,
  PatchChallengeRequest,
  PatchChallengeResponse,
  PostChallengeItemRequest,
  PostChallengeItemResponse,
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
    .delete<DeleteChallengeResponse>('/challenge', {
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

export const patchChallengeItem = (body: PatchChallengeItemRequest) =>
  https
    .patch<PatchChallengeItemResponse>('/challenge/challenge-item', body)
    .then((response) => {
      const parseResult = patchChallengeItemResponseSchema.safeParse(
        response.data
      );

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });

export const postChallengeItem = (body: PostChallengeItemRequest) =>
  https
    .post<PostChallengeItemResponse>('/challenge/challenge-item', body)
    .then((response) => {
      const parseResult = postChallengeItemResponseSchema.safeParse(
        response.data
      );

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });
