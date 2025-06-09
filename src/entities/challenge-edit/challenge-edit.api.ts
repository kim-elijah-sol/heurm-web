import { https } from '~/shared/lib';
import {
  deleteChallengeItemResponseSchema,
  deleteChallengeResponseSchema,
  getChallengeItemResponseSchema,
  patchChallengeItemResponseSchema,
  patchChallengeResponseSchema,
  postChallengeItemResponseSchema,
} from './challenge-edit.schema';
import {
  DeleteChallengeItemRequest,
  DeleteChallengeItemResponse,
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
    .then(https.validateResponse(getChallengeItemResponseSchema));

export const patchChallenge = (body: PatchChallengeRequest) =>
  https
    .patch<PatchChallengeResponse>('/challenge', body)
    .then(https.validateResponse(patchChallengeResponseSchema));

export const deleteChallenge = (data: DeleteChallengeRequest) =>
  https
    .delete<DeleteChallengeResponse>('/challenge', {
      data,
    })
    .then(https.validateResponse(deleteChallengeResponseSchema));

export const patchChallengeItem = (body: PatchChallengeItemRequest) =>
  https
    .patch<PatchChallengeItemResponse>('/challenge/challenge-item', body)
    .then(https.validateResponse(patchChallengeItemResponseSchema));

export const postChallengeItem = (body: PostChallengeItemRequest) =>
  https
    .post<PostChallengeItemResponse>('/challenge/challenge-item', body)
    .then(https.validateResponse(postChallengeItemResponseSchema));

export const deleteChallengeItem = (data: DeleteChallengeItemRequest) =>
  https
    .delete<DeleteChallengeItemResponse>('/challenge/challenge-item', {
      data,
    })
    .then(https.validateResponse(deleteChallengeItemResponseSchema));
