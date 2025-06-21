import { z } from 'zod';

export const challengeItemRepeatTypeSchema = z.union([
  z.literal('EVERY'),
  z.literal('N'),
  z.literal('NM'),
]);
