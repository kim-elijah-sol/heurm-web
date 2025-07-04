import { z } from 'zod';
import { flowMonthlyPatternSchema } from '../schema';

export type FlowMonthlyPattern = z.infer<typeof flowMonthlyPatternSchema>;
