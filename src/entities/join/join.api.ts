import { https } from '~/shared/lib';
import {
  postJoinResponseSchema,
  postVerifyEmailResponseSchema,
  postVerifyEmailSendResponseSchema,
} from './join.schema';
import type {
  PostJoinRequest,
  PostJoinResponse,
  PostVerifyEmailRequest,
  PostVerifyEmailResponse,
  PostVerifyEmailSendRequest,
  PostVerifyEmailSendResponse,
} from './join.type';

export const postVerifyEmailSend = (body: PostVerifyEmailSendRequest) =>
  https
    .post<PostVerifyEmailSendResponse>('/user/join/verify-email-send', body)
    .then(https.validateResponse(postVerifyEmailSendResponseSchema));

export const postVerifyEmail = (body: PostVerifyEmailRequest) =>
  https
    .post<PostVerifyEmailResponse>('/user/join/verify-email', body)
    .then(https.validateResponse(postVerifyEmailResponseSchema));

export const postJoin = (body: PostJoinRequest) =>
  https
    .post<PostJoinResponse>('/user/join', body)
    .then(https.validateResponse(postJoinResponseSchema));
