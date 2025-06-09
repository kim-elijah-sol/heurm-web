import { z } from 'zod';
import {
  postLoginRequestSchema,
  postLoginResponseSchema,
} from './login.schema';

export type PostLoginRequest = z.infer<typeof postLoginRequestSchema>;

export type PostLoginResponse = z.infer<typeof postLoginResponseSchema>;
