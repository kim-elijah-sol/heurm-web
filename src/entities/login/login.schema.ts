import { z } from 'zod';
import { emailSchema, passwordSchema } from '~/shared/schema';

export const postLoginRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const postLoginResponseSchema = z.object({
  accessToken: z.string({
    message: 'access token is not provided.<br>Please retry or contact us',
  }),
  refreshToken: z.string({
    message: 'refresh token is not provided.<br>Please retry or contact us',
  }),
  clientId: z.string({
    message: 'client id is not provided.<br>Please retry or contact us',
  }),
});
