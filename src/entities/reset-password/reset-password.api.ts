import { https } from '~/shared/lib';
import {
  patchResetPasswordResponseSchema,
  postVerifyEmailResponseSchema,
  postVerifyEmailSendResponseSchema,
} from './reset-password.schema';
import {
  PatchResetPasswordRequest,
  PatchResetPasswordResponse,
  PostVerifyEmailRequest,
  PostVerifyEmailResponse,
  PostVerifyEmailSendRequest,
  PostVerifyEmailSendResponse,
} from './reset-password.type';

export const postVerifyEmailSend = (body: PostVerifyEmailSendRequest) =>
  https
    .post<PostVerifyEmailSendResponse>(
      '/user/reset-password/verify-email-send',
      body
    )
    .then(https.validateResponse(postVerifyEmailSendResponseSchema));

export const postVerifyEmail = (body: PostVerifyEmailRequest) =>
  https
    .post<PostVerifyEmailResponse>('/user/reset-password/verify-email', body)
    .then(https.validateResponse(postVerifyEmailResponseSchema));

export const patchResetPassword = (body: PatchResetPasswordRequest) =>
  https
    .patch<PatchResetPasswordResponse>('/user/reset-password', body)
    .then(https.validateResponse(patchResetPasswordResponseSchema));
