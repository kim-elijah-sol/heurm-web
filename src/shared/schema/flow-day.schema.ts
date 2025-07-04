import { z } from 'zod';
import { FLOW_DAY } from '../constant';

export const flowDaySchema = z
  .array(z.enum(FLOW_DAY))
  .min(1, { message: 'You must choose at least one day' })
  .max(7, { message: 'You can select up to 7 days' });
