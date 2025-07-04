import { z } from 'zod';
import { flowRepeatTypeSchema } from '../schema';

export type FlowRepeatType = z.infer<typeof flowRepeatTypeSchema>;
