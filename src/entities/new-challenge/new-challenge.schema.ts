import { z } from 'zod';
import {
  challengeColorValidator,
  challengeTitleValidator,
} from '~/shared/validator';

export const postChallengeRequestSchema = z.object({
  title: challengeTitleValidator,
  color: challengeColorValidator,
});

export const postChallengeResponseSchema = z.object({
  title: challengeTitleValidator,
  id: z.string(),
});
