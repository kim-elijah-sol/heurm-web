import { z } from 'zod';
import { waveSchema } from '.';

export type GetWaveResponseItem = z.infer<
  typeof waveSchema.getWaveResponseItemSchema
>;

export type GetWaveResponse = z.infer<typeof waveSchema.getWaveResponseSchema>;

export type PostWaveRequest = z.infer<typeof waveSchema.postWaveRequestSchema>;

export type PostWaveResponse = z.infer<
  typeof waveSchema.postWaveResponseSchema
>;
