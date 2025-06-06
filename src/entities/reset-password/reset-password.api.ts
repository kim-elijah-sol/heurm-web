import { https } from '~/shared/lib';
import { verifyEmailSendResponseSchema } from './reset-password.schema';
import {
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
