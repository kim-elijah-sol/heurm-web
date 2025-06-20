import { z } from 'zod';

export const challengeItemIntervalTypeSchema = z.union([
  z.literal('DAILY'),
  z.literal('WEEKLY'),
  z.literal('MONTHLY'),
  z.literal('YEARLY'),
]);
