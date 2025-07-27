import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { joinApi } from '.';

const keys = createQueryKeys('join', {
  verifyEmailSend: ['verifyEmailSend'],
  verifyEmail: ['verifyEmail'],
  post: ['post'],
});

export const postVerifyEmailSendMutation = (
  onSuccess: (
    data: Awaited<ReturnType<typeof joinApi.postVerifyEmailSend>>
  ) => void
) =>
  useMutation(() => ({
    mutationKey: keys.verifyEmailSend.queryKey,
    mutationFn: joinApi.postVerifyEmailSend,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const postVerifyEmailMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof joinApi.postVerifyEmail>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.verifyEmail.queryKey,
    mutationFn: joinApi.postVerifyEmail,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const postJoinMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof joinApi.postJoin>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: joinApi.postJoin,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
