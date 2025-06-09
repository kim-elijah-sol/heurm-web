import { z } from 'zod';
import {
  postJoinRequestSchema,
  postJoinResponseSchema,
  postVerifyEmailRequestSchema,
  postVerifyEmailResponseSchema,
  postVerifyEmailSendRequestSchema,
  postVerifyEmailSendResponseSchema,
} from './join.schema';

export type PostVerifyEmailSendRequest = z.infer<
  typeof postVerifyEmailSendRequestSchema
>;

export type PostVerifyEmailSendResponse = z.infer<
  typeof postVerifyEmailSendResponseSchema
>;

export type PostVerifyEmailRequest = z.infer<
  typeof postVerifyEmailRequestSchema
>;

export type PostVerifyEmailResponse = z.infer<
  typeof postVerifyEmailResponseSchema
>;

export type PostJoinRequest = z.infer<typeof postJoinRequestSchema>;

export type PostJoinResponse = z.infer<typeof postJoinResponseSchema>;
