import { z } from 'zod';

export const passwordValidator = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(16, { message: 'Password must be at most 16 characters long' })
  .refine((val) => /[a-zA-Z]/.test(val), {
    message: 'Password must contain at least one letter',
  })
  .refine((val) => /[0-9]/.test(val), {
    message: 'Password must contain at least one number',
  })
  .refine((val) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(val), {
    message: 'Password must contain at least one special character',
  });
