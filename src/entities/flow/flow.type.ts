import { z } from 'zod';
import { flowSchema } from '.';

export type GetFlowResponseItem = z.infer<
  typeof flowSchema.getFlowResponseItemSchema
>;

export type GetFlowResponse = z.infer<typeof flowSchema.getFlowResponseSchema>;

export type PostFlowRequest = z.infer<typeof flowSchema.postFlowRequestSchema>;

export type PostFlowResponse = z.infer<
  typeof flowSchema.postFlowResponseSchema
>;

export type PatchFlowRequest = z.infer<
  typeof flowSchema.patchFlowRequestSchema
>;

export type PatchFlowResponse = z.infer<
  typeof flowSchema.patchFlowResponseSchema
>;

export type DeleteFlowRequest = z.infer<
  typeof flowSchema.deleteFlowRequestSchema
>;

export type DeleteFlowResponse = z.infer<
  typeof flowSchema.deleteFlowResponseSchema
>;
