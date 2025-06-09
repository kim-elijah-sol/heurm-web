import { z } from 'zod';

export const challengeTitleSchema = z
  .string()
  .min(2, {
    message: 'Challenge title must be at least 2 characters long',
  })
  .max(16, {
    message: 'Challenge title must be at most 16 characters long',
  });
