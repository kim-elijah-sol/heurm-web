import { z } from 'zod';
import {
  challengeColorValidator,
  challengeItemTypeValidator,
  challengeTitleValidator,
  dateValidator,
} from '~/shared/validator';

export const getChallengeResponseItemSchema = z.object({
  id: z.string(),
  title: challengeTitleValidator,
  color: challengeColorValidator,
});

export const getChallengeResponseSchema = z.array(
  getChallengeResponseItemSchema
);

export const getChallengeItemByDateRequestSchema = z.object({
  challengeId: z.string(),
  date: dateValidator,
});

export const getChallengeItemByDateResponseItemHistorySchema = z.object({
  complete: z.boolean().nullable(),
  count: z.number().nullable(),
  targetCount: z.number().nullable(),
});

export const getChallengeItemByDateResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: challengeItemTypeValidator,
  targetCount: z.number().nullable(),
  unit: z.string().nullable(),
  history: getChallengeItemByDateResponseItemHistorySchema.nullable(),
});

export const getChallengeItemByDateResponseSchema = z.object({
  originalChallengeItems: z.array(getChallengeItemByDateResponseItemSchema),
  todayChallengeItems: z.array(getChallengeItemByDateResponseItemSchema),
});
