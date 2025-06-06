import { z } from 'zod';

export const challengeTitleValidator = z.string().min(2).max(16);
