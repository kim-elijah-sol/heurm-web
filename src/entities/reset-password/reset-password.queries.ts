import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import {
  patchResetPassword,
  postVerifyEmail,
  postVerifyEmailSend,
} from './reset-password.api';

const keys = createQueryKeys('reset-password', {
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

export const patchResetPasswordMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof patchResetPassword>>) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: patchResetPassword,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
