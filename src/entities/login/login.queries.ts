import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { loginApi } from '.';

export const keys = createQueryKeys('login', {
  post: ['post'],
});

export const postLoginMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof loginApi.postLogin>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: loginApi.postLogin,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
