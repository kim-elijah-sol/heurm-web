import { z } from 'zod';

export const flowTitleSchema = z
  .string()
  .min(2, {
    message: 'Flow title must be at least 2 characters long',
  })
  .max(16, {
    message: 'Flow title must be at most 16 characters long',
  });
