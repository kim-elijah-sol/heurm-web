import { z } from 'zod';
import {
  getChallengeResponseItemSchema,
  getChallengeResponseSchema,
} from './main.schema';

export type ChallengeDayStatus = 'win' | 'lose' | 'pending';

export type GetChallengeResponseItemSchema = z.infer<
  typeof getChallengeResponseItemSchema
>;

export type GetChallengeResponseSchema = z.infer<
  typeof getChallengeResponseSchema
>;
