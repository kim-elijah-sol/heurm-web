import { z } from 'zod';
import {
  getChallengeResponseItemSchema,
  getChallengeResponseSchema,
  patchHistoryRequestCompleteSchema,
  patchHistoryRequestCountableSchema,
  patchHistoryRequestSchema,
  patchHistoryResponseSchema,
  postHistoryRequestCompleteSchema,
  postHistoryRequestCountableSchema,
  postHistoryRequestSchema,
  postHistoryResponseSchema,
} from './main.schema';

export type GetChallengeResponseItem = z.infer<
  typeof getChallengeResponseItemSchema
>;

export type GetChallengeResponse = z.infer<typeof getChallengeResponseSchema>;

export type PostHistoryCompleteRequest = z.infer<
  typeof postHistoryRequestCompleteSchema
>;

export type PostHistoryCountableRequest = z.infer<
  typeof postHistoryRequestCountableSchema
>;

export type PostHistoryRequest = z.infer<typeof postHistoryRequestSchema>;

export type PostHistoryResponse = z.infer<typeof postHistoryResponseSchema>;

export type PatchHistoryCompleteRequest = z.infer<
  typeof patchHistoryRequestCompleteSchema
>;

export type PatchHistoryCountableRequest = z.infer<
  typeof patchHistoryRequestCountableSchema
>;

export type PatchHistoryRequest = z.infer<typeof patchHistoryRequestSchema>;

export type PatchHistoryResponse = z.infer<typeof patchHistoryResponseSchema>;
