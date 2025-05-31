import { z } from 'zod';
import { loginFormValidator } from '~/shared/validator';
import { loginResponseSchema } from '../validator';

export type LoginRequest = z.infer<typeof loginFormValidator>;

export type LoginResponse = z.infer<typeof loginResponseSchema>;
