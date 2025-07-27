import { z } from 'zod';
import { resetPasswordSchema } from '.';

export type PostVerifyEmailSendRequest = z.infer<
  typeof resetPasswordSchema.postVerifyEmailSendRequestSchema
>;

export type PostVerifyEmailSendResponse = z.infer<
  typeof resetPasswordSchema.postVerifyEmailSendResponseSchema
>;

export type PostVerifyEmailRequest = z.infer<
  typeof resetPasswordSchema.postVerifyEmailRequestSchema
>;

export type PostVerifyEmailResponse = z.infer<
  typeof resetPasswordSchema.postVerifyEmailResponseSchema
>;

export type PatchResetPasswordRequest = z.infer<
  typeof resetPasswordSchema.patchResetPasswordRequestSchema
>;

export type PatchResetPasswordResponse = z.infer<
  typeof resetPasswordSchema.patchResetPasswordResponseSchema
>;
