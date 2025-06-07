import { z } from 'zod';

export const dateValidator = z.string().date();
