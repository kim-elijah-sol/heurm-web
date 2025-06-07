import { z } from 'zod';
import {
  challengeDayValidator,
  challengeItemTypeValidator,
} from '~/shared/validator';

export const getChallengeItemRequestSchema = z.object({
  challengeId: z.string(),
});

export const getChallengeItemResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  days: z.array(challengeDayValidator),
  type: challengeItemTypeValidator,
  targetCount: z.number().nullable(),
  unit: z.string().nullable(),
});

export const getChallengeItemResponseSchema = z.array(
  getChallengeItemResponseItemSchema
);
