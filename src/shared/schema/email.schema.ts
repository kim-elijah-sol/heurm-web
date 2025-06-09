import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Please enter a email')
  .email({ message: 'Please enter a valid email address' });
