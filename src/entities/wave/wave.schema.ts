import { z } from 'zod';

export const getWaveResponseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const getWaveResponseSchema = z.array(getWaveResponseItemSchema);
