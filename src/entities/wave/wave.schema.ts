import { z } from 'zod';

export const getWaveResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const getWaveResponseSchema = z.array(getWaveResponseItemSchema);

export const postWaveRequestSchema = z.object({
  name: z.string(),
});

export const postWaveResponseSchema = z.object({
  id: z.string(),
});

export const patchWaveRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const patchWaveResponseSchema = z.object({
  result: z.boolean(),
});

export const deleteWaveRequestSchema = z.object({
  id: z.string(),
});

export const deleteWaveResponseSchema = z.object({
  result: z.boolean(),
});

export const reorderWaveRequestSchema = z.object({
  ids: z.array(z.string()),
});

export const reorderWaveResponseSchema = z.object({
  result: z.boolean(),
});

export const getFlowWaveCountResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  flowWaveCount: z.number(),
});

export const getFlowWaveCountResponseSchema = z.array(
  getFlowWaveCountResponseItemSchema
);
