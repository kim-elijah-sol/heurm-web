import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { resetPasswordApi } from '.';

const keys = createQueryKeys('reset-password', {
  verifyEmailSend: ['verifyEmailSend'],
  verifyEmail: ['verifyEmail'],
  post: ['post'],
});

export const postVerifyEmailSendMutation = (
  onSuccess: (
    data: Awaited<ReturnType<typeof resetPasswordApi.postVerifyEmailSend>>
  ) => void
) =>
  useMutation(() => ({
    mutationKey: keys.verifyEmailSend.queryKey,
    mutationFn: resetPasswordApi.postVerifyEmailSend,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const postVerifyEmailMutation = (
  onSuccess: (
    data: Awaited<ReturnType<typeof resetPasswordApi.postVerifyEmail>>
  ) => void
) =>
  useMutation(() => ({
    mutationKey: keys.verifyEmail.queryKey,
    mutationFn: resetPasswordApi.postVerifyEmail,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const patchResetPasswordMutation = (
  onSuccess: (
    data: Awaited<ReturnType<typeof resetPasswordApi.patchResetPassword>>
  ) => void
) =>
  useMutation(() => ({
    mutationKey: keys.post.queryKey,
    mutationFn: resetPasswordApi.patchResetPassword,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
