import { z } from 'zod';
import {
  flowColorSchema,
  flowDaySchema,
  flowIntervalTypeSchema,
  flowRepeatTypeSchema,
  flowTitleSchema,
  flowTypeSchema,
} from '~/shared/schema';

export const getChallengeItemRequestSchema = z.object({
  challengeId: z.string(),
});

export const getChallengeItemResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: flowTypeSchema,
  intervalType: flowIntervalTypeSchema,
  repeatType: flowRepeatTypeSchema,
  repeat: z.number().nullable(),
  rest: z.number().nullable(),
  days: z.array(z.number()),
  dates: z.array(z.number()),
  weeks: z.array(z.number()),
  months: z.array(z.number()),
  targetCount: z.number().nullable(),
  unit: z.string().nullable(),
  accumulateType: flowIntervalTypeSchema.nullable(),
  startAt: z.string(),
  endAt: z.string().nullable(),
});

export const getChallengeItemResponseSchema = z.array(
  getChallengeItemResponseItemSchema
);

export const patchChallengeRequestSchema = z.object({
  challengeId: z.string(),
  title: flowTitleSchema,
  color: flowColorSchema,
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

const challengeItemFormBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  days: flowDaySchema,
  isNew: z.boolean().optional(),
  isDelete: z.boolean().optional(),
});

const completeChallengeItemSchema = challengeItemFormBaseSchema.extend({
  type: z.literal('COMPLETE'),
});

const countableChallengeItemSchema = challengeItemFormBaseSchema.extend({
  type: z.union([z.literal('OVER'), z.literal('UNDER')]),
  targetCount: z.number(),
  unit: z.string(),
});

export const challengeItemFormSchema = z.union([
  completeChallengeItemSchema,
  countableChallengeItemSchema,
]);

export const postChallengeItemRequestSchema = z.object({
  challengeId: z.string(),
  name: z.string(),
  type: flowTypeSchema,
  intervalType: flowIntervalTypeSchema,
  repeatType: flowRepeatTypeSchema,
  repeat: z.number().nullable().optional(),
  rest: z.number().nullable().optional(),
  days: z.array(z.number()).optional(),
  dates: z.array(z.number()).optional(),
  weeks: z.array(z.number()).optional(),
  months: z.array(z.number()).optional(),
  targetCount: z.number().nullable().optional(),
  unit: z.string().nullable().optional(),
  accumulateType: flowIntervalTypeSchema.nullable().optional(),
  startAt: z.string(),
  endAt: z.string().nullable().optional(),
});

export const postChallengeItemResponseSchema = z.object({
  id: z.string(),
});

export const patchChallengeItemRequestSchema =
  postChallengeItemRequestSchema.extend({
    challengeItemId: z.string(),
  });

export const patchChallengeItemResponseSchema = z.object({
  result: z.boolean(),
});

export const deleteChallengeItemRequestSchema = z.object({
  challengeId: z.string(),
  challengeItemId: z.string(),
});

export const deleteChallengeItemResponseSchema = z.object({
  result: z.boolean(),
});
