import { isAxiosError } from 'axios';
import { ZodError } from 'zod';
import { DEFAULT_ERROR_MESSAGE } from '~/shared/constant';
import { toast } from '../lib/toast';

type ToastAtErrorOptions = {
  chaining: boolean;
};

export const toastAtError = (error: any, options?: ToastAtErrorOptions) => {
  const chaining = options?.chaining ?? false;

  if (error instanceof ZodError) {
    toast.open(error.errors[0].message);
    return;
  } else if (isAxiosError(error)) {
    toast.open(error.response?.data ?? DEFAULT_ERROR_MESSAGE);
    return;
  }

  if (!chaining) {
    toast.open(DEFAULT_ERROR_MESSAGE);
  } else {
    throw error;
  }
};
