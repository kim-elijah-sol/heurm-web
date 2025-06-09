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
