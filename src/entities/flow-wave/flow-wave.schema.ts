import { z } from 'zod';

export const postFlowWaveRequestSchema = z.object({
  flowId: z.string(),
  waveId: z.string(),
});

export const postFlowWaveResponseSchema = z.object({
  result: z.boolean(),
});

export const deleteFlowWaveRequestSchema = z.object({
  flowId: z.string(),
  waveId: z.string(),
});

export const deleteFlowWaveResponseSchema = z.object({
  result: z.boolean(),
});
