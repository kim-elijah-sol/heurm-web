import { z } from 'zod';
import {
  deleteLogoutRequestSchema,
  deleteLogoutResponseSchema,
  getUserProfileResponseSchema,
  patchUserProfileRequestSchema,
  patchUserProfileResponseSchema,
} from './user.schema';

export type GetUserProfileResponse = z.infer<
  typeof getUserProfileResponseSchema
>;

export type PatchUserProfileRequest = z.infer<
  typeof patchUserProfileRequestSchema
>;

export type PatchUserProfileResponse = z.infer<
  typeof patchUserProfileResponseSchema
>;

export type DeleteLogoutRequest = z.infer<typeof deleteLogoutRequestSchema>;

export type DeleteLogoutResponse = z.infer<typeof deleteLogoutResponseSchema>;
