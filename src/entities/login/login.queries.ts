import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { postLogin } from './login.api';

export const postLoginMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postLogin>>) => void
) =>
  useMutation(() => ({
    mutationFn: postLogin,
    mutationKey: ['postLogin'],
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
