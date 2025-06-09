import { z } from 'zod';

export const dateSchema = z.string().date();
