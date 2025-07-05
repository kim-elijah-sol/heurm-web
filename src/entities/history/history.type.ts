import { z } from 'zod';
import { historySchema } from '.';

export type GetHistoryRequest = z.infer<
  typeof historySchema.getHistoryRequestSchema
>;

export type GetHistoryResponseItem = z.infer<
  typeof historySchema.getHistoryResponseItemSchema
>;

export type GetHistoryResponse = z.infer<
  typeof historySchema.getHistoryResponseSchema
>;
