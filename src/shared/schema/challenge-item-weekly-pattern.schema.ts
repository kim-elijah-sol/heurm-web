import { z } from 'zod';

export const challengeItemWeeklyPatternSchema = z.union([
  z.literal('Every Day'),
  z.literal('Select Day'),
]);
