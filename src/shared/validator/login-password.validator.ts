import { z } from 'zod';

export const loginPasswordValidator = z.string().min(1, {
  message: 'Please enter a password',
});
