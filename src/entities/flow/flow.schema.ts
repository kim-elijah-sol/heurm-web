import { z } from 'zod';
import {
  flowIntervalTypeSchema,
  flowRepeatTypeSchema,
  flowTypeSchema,
} from '~/shared/schema';

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
});

export const getFlowResponseSchema = z.array(getFlowResponseItemSchema);
