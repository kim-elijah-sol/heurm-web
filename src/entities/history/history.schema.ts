import { z } from 'zod';
import { dateSchema, flowTypeSchema } from '~/shared/schema';

export const getHistoryRequestSchema = z.object({
  flowId: z.string(),
});

export const getHistoryResponseItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  complete: z.boolean().nullable(),
  count: z.number().nullable(),
});

export const getHistoryResponseSchema = z.array(getHistoryResponseItemSchema);

const postHistoryRequestBaseSchema = z.object({
  flowId: z.string(),
  date: dateSchema,
  type: flowTypeSchema,
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
