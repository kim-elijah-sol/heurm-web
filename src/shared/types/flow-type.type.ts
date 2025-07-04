import { z } from 'zod';
import { flowTypeSchema } from '../schema';

export type FlowType = z.infer<typeof flowTypeSchema>;
