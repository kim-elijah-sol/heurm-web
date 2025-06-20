import { z } from 'zod';
import { challengeItemIntervalTypeSchema } from '../schema';

export type ChallengeItemIntervalType = z.infer<
  typeof challengeItemIntervalTypeSchema
>;
