import { z } from 'zod';
import { challengeTitleSchema, flowColorSchema } from '~/shared/schema';

export const postChallengeRequestSchema = z.object({
  title: challengeTitleSchema,
  color: flowColorSchema,
});

export const postChallengeResponseSchema = z.object({
  title: challengeTitleSchema,
  id: z.string(),
});
