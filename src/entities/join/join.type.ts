import { z } from 'zod';
import {
  verifyEmailRequestSchema,
  verifyEmailResponseSchema,
  verifyEmailSendRequestSchema,
  verifyEmailSendResponseSchema,
} from './join.schema';

export type VerifyEmailSendRequest = z.infer<
  typeof verifyEmailSendRequestSchema
>;

export type VerifyEmailSendResponse = z.infer<
  typeof verifyEmailSendResponseSchema
>;

export type VerifyEmailRequest = z.infer<typeof verifyEmailRequestSchema>;

export type VerifyEmailResponse = z.infer<typeof verifyEmailResponseSchema>;
