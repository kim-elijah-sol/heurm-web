import { z } from 'zod';
import {
  flowIntervalTypeSchema,
  flowRepeatTypeSchema,
  flowTypeSchema,
} from '~/shared/schema';

export const getFlowResponseItemWaveItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const getFlowResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
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
  startTime: z.number().nullable(),
  endTime: z.number().nullable(),
  wave: z.array(getFlowResponseItemWaveItemSchema),
});

export const getFlowResponseSchema = z.array(getFlowResponseItemSchema);

export const postFlowRequestSchema = z.object({
  name: z.string(),
  color: z.string(),
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
  startTime: z.number().nullable().optional(),
  endTime: z.number().nullable().optional(),
});

export const postFlowResponseSchema = z.object({
  id: z.string(),
});

export const patchFlowRequestSchema = postFlowRequestSchema.extend({
  flowId: z.string(),
});

export const patchFlowResponseSchema = z.object({
  result: z.boolean(),
});

export const deleteFlowRequestSchema = z.object({
  flowId: z.string(),
});

export const deleteFlowResponseSchema = z.object({
  result: z.boolean(),
});
