import { z } from 'zod';

export const flowYearlyPatternSchema = z.union([
  z.literal('Every Month'),
  z.literal('Select Month'),
]);
