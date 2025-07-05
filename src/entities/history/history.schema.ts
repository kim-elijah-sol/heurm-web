import { z } from 'zod';

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
