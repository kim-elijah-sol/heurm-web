import { z } from 'zod';
import {
  challengeColorValidator,
  challengeTitleValidator,
} from '~/shared/validator';

export const challengeResponseItemSchema = z.object({
  id: z.string(),
  title: challengeTitleValidator,
  color: challengeColorValidator,
});

export const challengeResponseSchema = z.array(challengeResponseItemSchema);
