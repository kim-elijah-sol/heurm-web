import { https } from '~/shared/lib';
import {
  joinResponseSchema,
  verifyEmailResponseSchema,
  verifyEmailSendResponseSchema,
} from './join.schema';
import {
  JoinRequest,
  JoinResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyEmailSendRequest,
  VerifyEmailSendResponse,
} from './join.type';

export const postVerifyEmailSend = (body: VerifyEmailSendRequest) =>
  https
    .post<VerifyEmailSendResponse>('/user/join/verify-email-send', body)
    .then(https.validateResponse(verifyEmailSendResponseSchema));

export const postVerifyEmail = (body: VerifyEmailRequest) =>
  https
    .post<VerifyEmailResponse>('/user/join/verify-email', body)
    .then(https.validateResponse(verifyEmailResponseSchema));

export const postJoin = (body: JoinRequest) =>
  https
    .post<JoinResponse>('/user/join', body)
    .then(https.validateResponse(joinResponseSchema));
