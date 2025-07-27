import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { postJoin, postVerifyEmail, postVerifyEmailSend } from './join.api';

const keys = createQueryKeys('join', {
  verifyEmailSend: ['verifyEmailSend'],
  verifyEmail: ['verifyEmail'],
  post: ['post'],
});

export const postVerifyEmailSendMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmailSend>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.verifyEmailSend.queryKey,
    mutationFn: postVerifyEmailSend,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const postVerifyEmailMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmail>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.verifyEmail.queryKey,
    mutationFn: postVerifyEmail,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const postJoinMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postJoin>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: postJoin,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
