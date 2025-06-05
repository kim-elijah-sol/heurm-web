import { z } from 'zod';
import { emailValidator } from '~/shared/validator';

export const verifyEmailSendRequestSchema = z.object({
  email: emailValidator,
});

export const verifyEmailSendResponseSchema = z.object({
  id: z.string(),
});
