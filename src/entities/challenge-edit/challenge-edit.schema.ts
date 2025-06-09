import { z } from 'zod';
import {
  challengeColorSchema,
  challengeDayItemSchema,
  challengeItemTypeSchema,
  challengeTitleSchema,
} from '~/shared/schema';

export const getChallengeItemRequestSchema = z.object({
  challengeId: z.string(),
});

export const getChallengeItemResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  days: challengeDayItemSchema,
  type: challengeItemTypeSchema,
  targetCount: z.number().nullable(),
  unit: z.string().nullable(),
});

export const getChallengeItemResponseSchema = z.array(
  getChallengeItemResponseItemSchema
);

export const patchChallengeRequestSchema = z.object({
  challengeId: z.string(),
  title: challengeTitleSchema,
  color: challengeColorSchema,
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
  type: challengeItemTypeSchema,
  days: challengeDayItemSchema,
  targetCount: z.number().optional().nullable(),
  unit: z.string().optional().nullable(),
});

export const patchChallengeItemResponseSchema = z.object({
  result: z.boolean(),
});

const challengeItemFormBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  days: challengeDayItemSchema,
  isNew: z.boolean().optional(),
  isDelete: z.boolean().optional(),
});

const completeChallengeItemSchema = challengeItemFormBaseSchema.extend({
  type: z.literal('COMPLETE'),
});

const countableChallengeItemSchema = challengeItemFormBaseSchema.extend({
  type: z.union([z.literal('OVER'), z.literal('UNDER')]),
  targetCount: z.number(),
});

export const challengeItemFormSchema = z.union([
  completeChallengeItemSchema,
  countableChallengeItemSchema,
]);

export const postChallengeItemRequestSchema = z.object({
  challengeId: z.string(),
  name: z.string(),
  type: challengeItemTypeSchema,
  days: challengeDayItemSchema,
  targetCount: z.number().optional().nullable(),
  unit: z.string().optional().nullable(),
});

export const postChallengeItemResponseSchema = z.object({
  id: z.string(),
});

export const deleteChallengeItemRequestSchema = z.object({
  challengeId: z.string(),
  challengeItemId: z.string(),
});

export const deleteChallengeItemResponseSchema = z.object({
  result: z.boolean(),
});
