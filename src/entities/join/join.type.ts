import { z } from 'zod';
import {
  verifyEmailSendRequestSchema,
  verifyEmailSendResponseSchema,
} from './join.schema';

export type VerifyEmailSendRequest = z.infer<
  typeof verifyEmailSendRequestSchema
>;

export type VerifyEmailSendResponse = z.infer<
  typeof verifyEmailSendResponseSchema
>;
