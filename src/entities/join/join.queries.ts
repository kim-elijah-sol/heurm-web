import { useMutation } from '@tanstack/solid-query';
import { postVerifyEmailSend } from './join.api';

export const verifyEmailSendMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmailSend>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postVerifyEmailSend'],
    mutationFn: postVerifyEmailSend,
    onSuccess,
  }));
