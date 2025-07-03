import { z } from 'zod';
import { flowColorSchema } from '../schema';

export type FlowColor = z.infer<typeof flowColorSchema>;
