import { z } from 'zod';
import { emailSchema, passwordSchema, verifyCodeSchema } from '~/shared/schema';

export const postVerifyEmailSendRequestSchema = z.object({
  email: emailSchema,
});

export const postVerifyEmailSendResponseSchema = z.object({
  id: z.string(),
});

export const postVerifyEmailRequestSchema = z.object({
  code: verifyCodeSchema,
  id: z.string(),
  email: emailSchema,
});

export const postVerifyEmailResponseSchema = z.object({
  result: z.boolean(),
});

export const patchResetPasswordRequestSchema = z.object({
  email: emailSchema,
  id: z.string(),
  newPassword: passwordSchema,
});

export const patchResetPasswordResponseSchema = z.object({
  result: z.boolean(),
});
