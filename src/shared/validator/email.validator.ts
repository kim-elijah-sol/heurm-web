import { z } from 'zod';

export const emailValidator = z
  .string()
  .min(1, 'Please enter a email')
  .email({ message: 'Please enter a valid email address' });
