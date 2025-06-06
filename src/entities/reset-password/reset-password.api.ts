import { https } from '~/shared/lib';
import {
  verifyEmailResponseSchema,
  verifyEmailSendResponseSchema,
} from './reset-password.schema';
import {
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
    .then((response) => {
      const parseResult = verifyEmailSendResponseSchema.safeParse(
        response.data
      );

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });

export const postVerifyEmail = (body: VerifyEmailRequest) =>
  https
    .post<VerifyEmailResponse>('/user/reset-password/verify-email', body)
    .then((response) => {
      const parseResult = verifyEmailResponseSchema.safeParse(response.data);

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });
