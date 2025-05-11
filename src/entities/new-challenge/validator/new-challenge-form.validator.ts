import { z } from 'zod';
import { CHALLENGE_COLOR } from '~/shared/constant';

export const newChallengeFormValidator = z.object({
  title: z.string().min(1).max(16),
  color: z.enum(CHALLENGE_COLOR),
});
