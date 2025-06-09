import { z } from 'zod';

export const getUserProfileResponseSchema = z.object({
  name: z.string(),
  email: z.string(),
  profileImage: z.string().nullable(),
});

export const patchUserProfileRequestSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  profileFile: z.instanceof(File).optional().nullable(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  isProfileImageRemove: z.boolean().optional(),
});

export const patchUserProfileResponseSchema = z.object({
  result: z.boolean(),
});

export const deleteLogoutRequestSchema = z.object({
  refreshToken: z.string(),
});

export const deleteLogoutResponseSchema = z.object({
  result: z.boolean(),
});
