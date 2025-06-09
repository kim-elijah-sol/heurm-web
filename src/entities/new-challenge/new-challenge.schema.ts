import { z } from 'zod';
import { challengeColorSchema, challengeTitleSchema } from '~/shared/schema';

export const postChallengeRequestSchema = z.object({
  title: challengeTitleSchema,
  color: challengeColorSchema,
});

export const postChallengeResponseSchema = z.object({
  title: challengeTitleSchema,
  id: z.string(),
});
