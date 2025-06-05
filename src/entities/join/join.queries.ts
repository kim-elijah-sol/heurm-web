import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { postVerifyEmail, postVerifyEmailSend } from './join.api';

export const verifyEmailSendMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmailSend>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postVerifyEmailSend'],
    mutationFn: postVerifyEmailSend,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const verifyEmailMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmail>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postVerifyEmail'],
    mutationFn: postVerifyEmail,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
