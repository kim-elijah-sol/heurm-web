import { z } from 'zod';
import { FLOW_COLOR } from '../constant';

export const flowColorSchema = z.enum(FLOW_COLOR);
