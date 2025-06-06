import { z } from 'zod';
import {
  verifyEmailSendRequestSchema,
  verifyEmailSendResponseSchema,
} from './reset-password.schema';

export type VerifyEmailSendRequest = z.infer<
  typeof verifyEmailSendRequestSchema
>;

export type VerifyEmailSendResponse = z.infer<
  typeof verifyEmailSendResponseSchema
>;
