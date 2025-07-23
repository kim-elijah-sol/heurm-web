import { z } from 'zod';
import { waveSchema } from '.';

export type GetWaveResponseItem = z.infer<
  typeof waveSchema.getWaveResponseItemSchema
>;

export type GetWaveResponse = z.infer<typeof waveSchema.getWaveResponseSchema>;
