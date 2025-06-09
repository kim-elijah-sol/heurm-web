import { z } from 'zod';
import { CHALLENGE_DAY } from '../constant';

export const challengeDayItemSchema = z
  .array(z.enum(CHALLENGE_DAY))
  .min(1, { message: 'You must choose at least one day' })
  .max(7, { message: 'You can select up to 7 days' });
