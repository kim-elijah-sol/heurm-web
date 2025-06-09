import { z } from 'zod';

export const challengeItemTypeSchema = z.union([
  z.literal('COMPLETE'),
  z.literal('OVER'),
  z.literal('UNDER'),
]);
