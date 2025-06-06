import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { postVerifyEmailSend } from './reset-password.api';

export const verifyEmailSendMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmailSend>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['reset-password/postVerifyEmailSend'],
    mutationFn: postVerifyEmailSend,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
