import { z } from 'zod';
import { joinSchema } from '.';

export type PostVerifyEmailSendRequest = z.infer<
  typeof joinSchema.postVerifyEmailSendRequestSchema
>;

export type PostVerifyEmailSendResponse = z.infer<
  typeof joinSchema.postVerifyEmailSendResponseSchema
>;

export type PostVerifyEmailRequest = z.infer<
  typeof joinSchema.postVerifyEmailRequestSchema
>;

export type PostVerifyEmailResponse = z.infer<
  typeof joinSchema.postVerifyEmailResponseSchema
>;

export type PostJoinRequest = z.infer<typeof joinSchema.postJoinRequestSchema>;

export type PostJoinResponse = z.infer<
  typeof joinSchema.postJoinResponseSchema
>;
