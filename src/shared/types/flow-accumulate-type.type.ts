import { z } from 'zod';
import { flowAccumulateTypeSchema } from '../schema';

export type FlowAccumulateType = z.infer<typeof flowAccumulateTypeSchema>;
