import { https } from '~/shared/lib';
import { joinSchema, type JoinType } from '.';

export const postVerifyEmailSend = (
  body: JoinType.PostVerifyEmailSendRequest
) =>
  https
    .post<JoinType.PostVerifyEmailSendResponse>(
      '/user/join/verify-email-send',
      body
    )
    .then(https.validateResponse(joinSchema.postVerifyEmailSendResponseSchema));

export const postVerifyEmail = (body: JoinType.PostVerifyEmailRequest) =>
  https
    .post<JoinType.PostVerifyEmailResponse>('/user/join/verify-email', body)
    .then(https.validateResponse(joinSchema.postVerifyEmailResponseSchema));

export const postJoin = (body: JoinType.PostJoinRequest) =>
  https
    .post<JoinType.PostJoinResponse>('/user/join', body)
    .then(https.validateResponse(joinSchema.postJoinResponseSchema));
