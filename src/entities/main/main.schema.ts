import { z } from 'zod';
import {
  challengeColorValidator,
  challengeTitleValidator,
} from '~/shared/validator';

export const getChallengeResponseItemSchema = z.object({
  id: z.string(),
  title: challengeTitleValidator,
  color: challengeColorValidator,
});

export const getChallengeResponseSchema = z.array(
  getChallengeResponseItemSchema
);
