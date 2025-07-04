import { z } from 'zod';
import { flowColorSchema, flowTitleSchema } from '~/shared/schema';

export const postChallengeRequestSchema = z.object({
  title: flowTitleSchema,
  color: flowColorSchema,
});

export const postChallengeResponseSchema = z.object({
  title: flowTitleSchema,
  id: z.string(),
});
