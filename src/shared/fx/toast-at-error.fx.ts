import { isAxiosError } from 'axios';
import { ZodError } from 'zod';
import { DEFAULT_ERROR_MESSAGE } from '~/shared/constant';
import { toast } from '../lib/toast';

type ToastAtErrorOptions = {
  chaining: boolean;
};

export const toastAtError = (
  error: any,
  options?: ToastAtErrorOptions
): string => {
  const chaining = options?.chaining ?? false;

  if (error instanceof ZodError) {
    return toast.open(error.errors[0].message);
  } else if (isAxiosError(error)) {
    return toast.open(error.response?.data ?? DEFAULT_ERROR_MESSAGE);
  }

  if (!chaining) {
    return toast.open(DEFAULT_ERROR_MESSAGE);
  } else {
    throw error;
  }
};
