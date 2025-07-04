import { z } from 'zod';

export const flowTypeSchema = z.union([
  z.literal('COMPLETE'),
  z.literal('OVER'),
  z.literal('UNDER'),
]);
