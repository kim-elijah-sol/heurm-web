import { z } from 'zod';

export const flowAccumulateTypeSchema = z.union([
  z.literal('WEEKLY'),
  z.literal('MONTHLY'),
  z.literal('YEARLY'),
]);
