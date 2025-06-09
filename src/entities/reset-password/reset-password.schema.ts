import { z } from 'zod';
import {
  emailValidator,
  passwordValidator,
  verifyCodeValidator,
} from '~/shared/validator';

export const postVerifyEmailSendRequestSchema = z.object({
  email: emailValidator,
});

export const postVerifyEmailSendResponseSchema = z.object({
  id: z.string(),
});

export const postVerifyEmailRequestSchema = z.object({
  code: verifyCodeValidator,
  id: z.string(),
  email: emailValidator,
});

export const postVerifyEmailResponseSchema = z.object({
  result: z.boolean(),
});

export const patchResetPasswordRequestSchema = z.object({
  email: emailValidator,
  id: z.string(),
  newPassword: passwordValidator,
});

export const patchResetPasswordResponseSchema = z.object({
  result: z.boolean(),
});
