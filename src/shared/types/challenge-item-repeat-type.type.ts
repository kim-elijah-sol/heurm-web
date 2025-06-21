import { z } from 'zod';
import { challengeItemRepeatTypeSchema } from '../schema';

export type ChallengeItemRepeatType = z.infer<
  typeof challengeItemRepeatTypeSchema
>;
