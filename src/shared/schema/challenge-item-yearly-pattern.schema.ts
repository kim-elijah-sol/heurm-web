import { z } from 'zod';

export const challengeItemYearlyPatternSchema = z.union([
  z.literal('Every Month'),
  z.literal('Select Month'),
]);
