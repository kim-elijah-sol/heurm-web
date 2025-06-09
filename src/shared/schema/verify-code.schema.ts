import { z } from 'zod';

export const verifyCodeSchema = z
  .string()
  .length(6)
  .refine((val) => /[0-9]/.test(val));
