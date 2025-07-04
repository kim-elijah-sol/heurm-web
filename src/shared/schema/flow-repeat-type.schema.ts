import { z } from 'zod';

export const flowRepeatTypeSchema = z.union([
  z.literal('EVERY'),
  z.literal('N'),
  z.literal('NM'),
]);
