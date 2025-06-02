import { z } from 'zod';

export const profileResponseSchema = z.object({
  name: z.string(),
  email: z.string(),
  profileImage: z.string().nullable(),
});

export const userSettingFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  profileImage: z.instanceof(File).optional().nullable(),
  currentPassword: z.string(),
  newPassword: z.string(),
});
