import { z } from 'zod';
import { flowWeeklyPatternSchema } from '../schema';

export type FlowWeeklyPattern = z.infer<typeof flowWeeklyPatternSchema>;
