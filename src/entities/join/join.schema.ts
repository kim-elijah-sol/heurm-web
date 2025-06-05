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

export const joinRequestSchema = z.object({
  email: emailValidator,
  id: z.string(),
  password: passwordValidator,
  timezone: z.string(),
  timezoneOffset: z.number(),
});

export const joinResponseSchema = z.object({
  result: z.boolean(),
});
