import { z } from 'zod';
import {
  logoutRequestSchema,
  logoutResponseSchema,
  profileResponseSchema,
  userSettingFormSchema,
} from './user.validator';

export type ProfileResponse = z.infer<typeof profileResponseSchema>;

export type UserSettingForm = z.infer<typeof userSettingFormSchema>;

export type LogoutRequest = z.infer<typeof logoutRequestSchema>;

export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
