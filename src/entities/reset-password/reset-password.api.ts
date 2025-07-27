import { https } from '~/shared/lib';
import { resetPasswordSchema, ResetPasswordType } from '.';

export const postVerifyEmailSend = (
  body: ResetPasswordType.PostVerifyEmailSendRequest
) =>
  https
    .post<ResetPasswordType.PostVerifyEmailSendResponse>(
      '/user/reset-password/verify-email-send',
      body
    )
    .then(
      https.validateResponse(
        resetPasswordSchema.postVerifyEmailSendResponseSchema
      )
    );

export const postVerifyEmail = (
  body: ResetPasswordType.PostVerifyEmailRequest
) =>
  https
    .post<ResetPasswordType.PostVerifyEmailResponse>(
      '/user/reset-password/verify-email',
      body
    )
    .then(
      https.validateResponse(resetPasswordSchema.postVerifyEmailResponseSchema)
    );

export const patchResetPassword = (
  body: ResetPasswordType.PatchResetPasswordRequest
) =>
  https
    .patch<ResetPasswordType.PatchResetPasswordResponse>(
      '/user/reset-password',
      body
    )
    .then(
      https.validateResponse(
        resetPasswordSchema.patchResetPasswordResponseSchema
      )
    );
