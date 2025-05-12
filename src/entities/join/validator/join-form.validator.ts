import { z } from 'zod';
import { emailValidator, passwordValidator } from '~/shared/validator';

export const joinFormValidator = z.object({
  email: emailValidator,
  password: passwordValidator,
});
