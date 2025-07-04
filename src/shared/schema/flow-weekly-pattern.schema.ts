import { z } from 'zod';

export const flowWeeklyPatternSchema = z.union([
  z.literal('Every Day'),
  z.literal('Select Day'),
]);
