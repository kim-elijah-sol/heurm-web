import { z } from 'zod';
import { emailValidator, passwordValidator } from '~/shared/validator';

export const postLoginRequestSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
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
