import { z } from 'zod';
import {
  getChallengeItemByDateRequestSchema,
  getChallengeItemByDateResponseItemHistorySchema,
  getChallengeItemByDateResponseItemSchema,
  getChallengeItemByDateResponseSchema,
  getChallengeResponseItemSchema,
  getChallengeResponseSchema,
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
