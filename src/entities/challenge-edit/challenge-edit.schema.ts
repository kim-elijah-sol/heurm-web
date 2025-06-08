import { z } from 'zod';
import {
  challengeColorValidator,
  challengeDayValidator,
  challengeItemTypeValidator,
  challengeTitleValidator,
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

export const patchChallengeRequestSchema = z.object({
  challengeId: z.string(),
  title: challengeTitleValidator,
  color: challengeColorValidator,
});

export const patchChallengeResponseSchema = z.object({
  result: z.boolean(),
});
