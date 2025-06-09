import { z } from 'zod';
import {
  patchResetPasswordRequestSchema,
  patchResetPasswordResponseSchema,
  postVerifyEmailRequestSchema,
  postVerifyEmailResponseSchema,
  postVerifyEmailSendRequestSchema,
  postVerifyEmailSendResponseSchema,
} from './reset-password.schema';

export type PostVerifyEmailSendRequest = z.infer<
  typeof postVerifyEmailSendRequestSchema
>;

export type PostVerifyEmailSendResponse = z.infer<
  typeof postVerifyEmailSendResponseSchema
>;

export type PostVerifyEmailRequest = z.infer<
  typeof postVerifyEmailRequestSchema
>;

export type PostVerifyEmailResponse = z.infer<
  typeof postVerifyEmailResponseSchema
>;

export type PatchResetPasswordRequest = z.infer<
  typeof patchResetPasswordRequestSchema
>;

export type PatchResetPasswordResponse = z.infer<
  typeof patchResetPasswordResponseSchema
>;
