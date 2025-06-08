import { z } from 'zod';
import {
  deleteChallengeRequestSchema,
  deleteChallengeResponseSchema,
  getChallengeItemRequestSchema,
  getChallengeItemResponseItemSchema,
  getChallengeItemResponseSchema,
  patchChallengeRequestSchema,
  patchChallengeResponseSchema,
} from './challenge-edit.schema';

export type GetChallengeItemRequest = z.infer<
  typeof getChallengeItemRequestSchema
>;

export type GetChallengeItemResponseItem = z.infer<
  typeof getChallengeItemResponseItemSchema
>;

export type GetChallengeItemResponse = z.infer<
  typeof getChallengeItemResponseSchema
>;

export type PatchChallengeRequest = z.infer<typeof patchChallengeRequestSchema>;

export type PatchChallengeResponse = z.infer<
  typeof patchChallengeResponseSchema
>;

export type DeleteChallengeRequest = z.infer<
  typeof deleteChallengeRequestSchema
>;

export type DeleteChallengeResponse = z.infer<
  typeof deleteChallengeResponseSchema
>;
