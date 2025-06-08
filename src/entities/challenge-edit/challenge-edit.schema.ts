import { z } from 'zod';
import {
  challengeColorValidator,
  challengeDayItemValidator,
  challengeItemTypeValidator,
  challengeTitleValidator,
} from '~/shared/validator';

export const getChallengeItemRequestSchema = z.object({
  challengeId: z.string(),
});

export const getChallengeItemResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  days: challengeDayItemValidator,
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

export const deleteChallengeRequestSchema = z.object({
  challengeId: z.string(),
});

export const deleteChallengeResponseSchema = z.object({
  result: z.boolean(),
});

export const patchChallengeItemRequestSchema = z.object({
  challengeId: z.string(),
  challengeItemId: z.string(),
  name: z.string(),
  type: challengeItemTypeValidator,
  days: challengeDayItemValidator,
  targetCount: z.number().optional().nullable(),
  unit: z.string().optional().nullable(),
});

export const patchChallengeItemResponseSchema = z.object({
  result: z.boolean(),
});
