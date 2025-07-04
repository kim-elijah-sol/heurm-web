import { z } from 'zod';

export const flowMonthlyPatternSchema = z.union([
  z.literal('Every Week'),
  z.literal('Select Date'),
  z.literal('Select Week'),
]);
