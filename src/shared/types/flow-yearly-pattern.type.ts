import { z } from 'zod';
import { flowYearlyPatternSchema } from '../schema';

export type FlowYearlyPattern = z.infer<typeof flowYearlyPatternSchema>;
