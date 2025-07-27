import { z } from 'zod';
import { userSchema } from '.';

export type GetUserProfileResponse = z.infer<
  typeof userSchema.getUserProfileResponseSchema
>;

export type PatchUserProfileRequest = z.infer<
  typeof userSchema.patchUserProfileRequestSchema
>;

export type PatchUserProfileResponse = z.infer<
  typeof userSchema.patchUserProfileResponseSchema
>;

export type DeleteLogoutRequest = z.infer<
  typeof userSchema.deleteLogoutRequestSchema
>;

export type DeleteLogoutResponse = z.infer<
  typeof userSchema.deleteLogoutResponseSchema
>;
