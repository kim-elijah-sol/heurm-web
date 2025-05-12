import { z } from 'zod';
import { emailValidator, passwordValidator } from '~/shared/validator';

export const joinFormValidator = z.object({
  email: emailValidator,
  password: passwordValidator,
  verifyCode: z
    .string()
    .length(6)
    .refine((val) => /[0-9]/.test(val)),
});
