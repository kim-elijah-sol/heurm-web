import { z } from 'zod';
import {
  postChallengeRequestSchema,
  postChallengeResponseSchema,
} from './new-challenge.schema';

export type PostChallengeRequestSchema = z.infer<
  typeof postChallengeRequestSchema
>;

export type PostChallengeResponseSchema = z.infer<
  typeof postChallengeResponseSchema
>;
