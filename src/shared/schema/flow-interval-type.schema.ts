import { z } from 'zod';

export const flowIntervalTypeSchema = z.union([
  z.literal('DAILY'),
  z.literal('WEEKLY'),
  z.literal('MONTHLY'),
  z.literal('YEARLY'),
]);
