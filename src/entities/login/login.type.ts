import { z } from 'zod';
import { loginSchema } from '.';

export type PostLoginRequest = z.infer<
  typeof loginSchema.postLoginRequestSchema
>;

export type PostLoginResponse = z.infer<
  typeof loginSchema.postLoginResponseSchema
>;
