import { z } from 'zod';
import { challengeItemWeeklyPatternSchema } from '../schema';

export type ChallengeItemWeeklyPattern = z.infer<
  typeof challengeItemWeeklyPatternSchema
>;
