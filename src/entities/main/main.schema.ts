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

const postHistoryRequestBaseSchema = z.object({
  challengeId: z.string(),
  challengeItemId: z.string(),
  date: dateSchema,
  type: challengeItemTypeSchema,
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
