import { z } from 'zod';
import {
  challengeResponseItemSchema,
  challengeResponseSchema,
} from './main.schema';

export type ChallengeDayStatus = 'win' | 'lose' | 'pending';

export type ChallengeResponseItemSchema = z.infer<
  typeof challengeResponseItemSchema
>;

export type ChallengeResponseSchema = z.infer<typeof challengeResponseSchema>;
