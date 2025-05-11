import { z } from 'zod';
import { emailValidator } from './email.validator';
import { loginPasswordValidator } from './login-password.validator';
import { passwordValidator } from './password.validator';

export const loginFormValidator = z.object({
  email: emailValidator,
  password: passwordValidator,
});

export const unsafeLoginFormValidator = z.object({
  email: emailValidator,
  password: loginPasswordValidator,
});
