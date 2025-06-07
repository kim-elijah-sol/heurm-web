import { z } from 'zod';
import { CHALLENGE_DAY } from '../constant';

export const challengeDayValidator = z.enum(CHALLENGE_DAY);
