import { z } from 'zod';
import { flowSchema } from '.';

export type GetFlowResponseItem = z.infer<
  typeof flowSchema.getFlowResponseItemSchema
>;

export type GetFlowResponse = z.infer<typeof flowSchema.getFlowResponseSchema>;
