import { z } from 'zod';
import { emailValidator, verifyCodeValidator } from '~/shared/validator';

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
