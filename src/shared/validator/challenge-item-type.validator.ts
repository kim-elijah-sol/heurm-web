import { z } from 'zod';

export const challengeItemTypeValidator = z.union([
  z.literal('COMPLETE'),
  z.literal('OVER'),
  z.literal('UNDER'),
]);
