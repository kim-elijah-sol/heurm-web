import { z } from 'zod';

export const profileResponseSchema = z.object({
  name: z.string(),
  email: z.string(),
  profileImage: z.string().nullable(),
});
