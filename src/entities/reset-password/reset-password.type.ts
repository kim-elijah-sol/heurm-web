import { z } from 'zod';
import {
  resetPasswordRequestSchema,
  resetPasswordResponseSchema,
  verifyEmailRequestSchema,
  verifyEmailResponseSchema,
  verifyEmailSendRequestSchema,
  verifyEmailSendResponseSchema,
} from './reset-password.schema';

export type VerifyEmailSendRequest = z.infer<
  typeof verifyEmailSendRequestSchema
>;

export type VerifyEmailSendResponse = z.infer<
  typeof verifyEmailSendResponseSchema
>;

export type VerifyEmailRequest = z.infer<typeof verifyEmailRequestSchema>;

export type VerifyEmailResponse = z.infer<typeof verifyEmailResponseSchema>;

export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;

export type ResetPasswordResponse = z.infer<typeof resetPasswordResponseSchema>;
