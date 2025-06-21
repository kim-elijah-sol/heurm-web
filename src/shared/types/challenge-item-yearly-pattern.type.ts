import { z } from 'zod';
import { challengeItemYearlyPatternSchema } from '../schema';

export type ChallengeItemYearlyPattern = z.infer<
  typeof challengeItemYearlyPatternSchema
>;
