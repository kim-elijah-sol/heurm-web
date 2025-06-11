import { z } from 'zod';
import {
  challengeColorSchema,
  challengeItemTypeSchema,
  challengeTitleSchema,
  dateSchema,
} from '~/shared/schema';

export const getChallengeResponseItemSchema = z.object({
  id: z.string(),
  title: challengeTitleSchema,
  color: challengeColorSchema,
});

export const getChallengeResponseSchema = z.array(
  getChallengeResponseItemSchema
);

export const getChallengeItemByDateRequestSchema = z.object({
  challengeId: z.string(),
  date: dateSchema,
});

export const getChallengeItemByDateResponseItemHistorySchema = z.object({
  id: z.string(),
  complete: z.boolean().nullable(),
  count: z.number().nullable(),
  targetCount: z.number().nullable(),
});

export const getChallengeItemByDateResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: challengeItemTypeSchema,
  targetCount: z.number().nullable(),
  unit: z.string().nullable(),
  history: getChallengeItemByDateResponseItemHistorySchema.nullable(),
});

export const getChallengeItemByDateResponseSchema = z.object({
  originalChallengeItems: z.array(getChallengeItemByDateResponseItemSchema),
  todayChallengeItems: z.array(getChallengeItemByDateResponseItemSchema),
});

const postHistoryRequestBaseSchema = z.object({
  challengeId: z.string(),
  challengeItemId: z.string(),
  date: dateSchema,
});

export const postHistoryRequestCompleteSchema =
  postHistoryRequestBaseSchema.extend({
    complete: z.boolean().nullable().optional(),
  });

export const postHistoryRequestCountableSchema =
  postHistoryRequestBaseSchema.extend({
    count: z.number().nullable().optional(),
    targetCount: z.number().nullable().optional(),
  });

export const postHistoryRequestSchema = z.union([
  postHistoryRequestCompleteSchema,
  postHistoryRequestCountableSchema,
]);

export const postHistoryResponseSchema = z.object({
  id: z.string(),
});

const patchHistoryRequestBaseSchema = postHistoryRequestBaseSchema
  .omit({ date: true })
  .extend({
    id: z.string(),
  });

export const patchHistoryRequestCompleteSchema =
  patchHistoryRequestBaseSchema.extend({
    complete: z.boolean().nullable().optional(),
  });

export const patchHistoryRequestCountableSchema =
  patchHistoryRequestBaseSchema.extend({
    count: z.number().nullable().optional(),
    targetCount: z.number().nullable().optional(),
  });

export const patchHistoryRequestSchema = z.union([
  patchHistoryRequestCompleteSchema,
  patchHistoryRequestCountableSchema,
]);

export const patchHistoryResponseSchema = z.object({
  id: z.string(),
});

export const getChallengeOverviewRequestSchema = z.object({
  date: dateSchema,
});

export const getChallengeOverviewResponseSchema = z.object({
  inProgress: z.number(),
  win: z.number(),
  lose: z.number(),
});
