import { https } from '~/shared/lib';
import {
  verifyEmailResponseSchema,
  verifyEmailSendResponseSchema,
} from './join.schema';
import {
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailSendRequest,
  VerifyEmailSendResponse,
} from './join.type';

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

export const postVerifyEmail = (body: VerifyEmailRequest) =>
  https
    .post<VerifyEmailResponse>('/user/join/verify-email', body)
    .then((response) => {
      const parseResult = verifyEmailResponseSchema.safeParse(response.data);

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });
