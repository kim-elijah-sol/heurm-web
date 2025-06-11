import { z } from 'zod';
import {
  getChallengeItemByDateRequestSchema,
  getChallengeItemByDateResponseItemHistorySchema,
  getChallengeItemByDateResponseItemSchema,
  getChallengeItemByDateResponseSchema,
  getChallengeOverviewRequestSchema,
  getChallengeOverviewResponseSchema,
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

export type ChallengeDayStatus = 'win' | 'lose' | 'pending';

export type GetChallengeResponseItem = z.infer<
  typeof getChallengeResponseItemSchema
>;

export type GetChallengeResponse = z.infer<typeof getChallengeResponseSchema>;

export type GetChallengeItemByDateRequest = z.infer<
  typeof getChallengeItemByDateRequestSchema
>;

export type GetChallengeItemByDateResponseItemHistory = z.infer<
  typeof getChallengeItemByDateResponseItemHistorySchema
>;

export type GetChallengeItemByDateResponseItem = z.infer<
  typeof getChallengeItemByDateResponseItemSchema
>;

export type GetChallengeItemByDateResponse = z.infer<
  typeof getChallengeItemByDateResponseSchema
>;

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

export type GetChallengeOverviewRequest = z.infer<
  typeof getChallengeOverviewRequestSchema
>;

export type GetChallengeOverviewResponse = z.infer<
  typeof getChallengeOverviewResponseSchema
>;
