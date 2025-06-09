import { https } from '~/shared/lib';
import {
  resetPasswordResponseSchema,
  verifyEmailResponseSchema,
  verifyEmailSendResponseSchema,
} from './reset-password.schema';
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailSendRequest,
  VerifyEmailSendResponse,
} from './reset-password.type';

export const postVerifyEmailSend = (body: VerifyEmailSendRequest) =>
  https
    .post<VerifyEmailSendResponse>(
      '/user/reset-password/verify-email-send',
      body
    )
    .then(https.validateResponse(verifyEmailSendResponseSchema));

export const postVerifyEmail = (body: VerifyEmailRequest) =>
  https
    .post<VerifyEmailResponse>('/user/reset-password/verify-email', body)
    .then(https.validateResponse(verifyEmailResponseSchema));

export const patchResetPassword = (body: ResetPasswordRequest) =>
  https
    .patch<ResetPasswordResponse>('/user/reset-password', body)
    .then(https.validateResponse(resetPasswordResponseSchema));
