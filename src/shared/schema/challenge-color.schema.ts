import { z } from 'zod';
import { CHALLENGE_COLOR } from '../constant';

export const challengeColorSchema = z.enum(CHALLENGE_COLOR);
