import { z } from 'zod';
import {
  emailValidator,
  passwordValidator,
  verifyCodeValidator,
} from '~/shared/validator';

export const verifyEmailSendRequestSchema = z.object({
  email: emailValidator,
});

export const verifyEmailSendResponseSchema = z.object({
  id: z.string(),
});

export const verifyEmailRequestSchema = z.object({
  code: verifyCodeValidator,
  id: z.string(),
  email: emailValidator,
});

export const verifyEmailResponseSchema = z.object({
  result: z.boolean(),
});

export const resetPasswordRequestSchema = z.object({
  email: emailValidator,
  id: z.string(),
  newPassword: passwordValidator,
});

export const resetPasswordResponseSchema = z.object({
  result: z.boolean(),
});
