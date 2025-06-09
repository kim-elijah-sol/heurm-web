import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import {
  patchResetPassword,
  postVerifyEmail,
  postVerifyEmailSend,
} from './reset-password.api';

export const postVerifyEmailSendMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmailSend>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['reset-password/postVerifyEmailSend'],
    mutationFn: postVerifyEmailSend,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const postVerifyEmailMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmail>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['reset-password/postVerifyEmail'],
    mutationFn: postVerifyEmail,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const patchResetPasswordMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof patchResetPassword>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['reset-password'],
    mutationFn: patchResetPassword,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
