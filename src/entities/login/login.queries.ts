import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { postLogin } from './login.api';

export const keys = createQueryKeys('login', {
  post: ['post'],
});

export const postLoginMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postLogin>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: postLogin,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
