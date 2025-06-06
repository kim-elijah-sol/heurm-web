import { z } from 'zod';
import { CHALLENGE_COLOR } from '../constant';

export const challengeColorValidator = z.enum(CHALLENGE_COLOR);
