import { z } from 'zod';
import { profileResponseSchema } from './user.validator';

export type ProfileResponse = z.infer<typeof profileResponseSchema>;
