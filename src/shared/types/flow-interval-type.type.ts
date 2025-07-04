import { z } from 'zod';
import { flowIntervalTypeSchema } from '../schema';

export type FlowIntervalType = z.infer<typeof flowIntervalTypeSchema>;
