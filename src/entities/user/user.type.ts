import { z } from 'zod';
import { profileResponseSchema, userSettingFormSchema } from './user.validator';

export type ProfileResponse = z.infer<typeof profileResponseSchema>;

export type UserSettingForm = z.infer<typeof userSettingFormSchema>;
