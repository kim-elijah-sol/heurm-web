import { z } from 'zod';

export const joinFormValidator = z.object({
  email: z.string().email(),
});
