import { z } from 'zod';
import { challengeItemMonthlyPatternSchema } from '../schema';

export type ChallengeItemMonthlyPattern = z.infer<
  typeof challengeItemMonthlyPatternSchema
>;
