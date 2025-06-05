import { https } from '~/shared/lib';
import { verifyEmailSendResponseSchema } from './join.schema';
import { VerifyEmailSendRequest, VerifyEmailSendResponse } from './join.type';

export const postVerifyEmailSend = (body: VerifyEmailSendRequest) =>
  https
    .post<VerifyEmailSendResponse>('/user/join/verify-email-send', body)
    .then((response) => {
      const parseResult = verifyEmailSendResponseSchema.safeParse(
        response.data
      );

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });
