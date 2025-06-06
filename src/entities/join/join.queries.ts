import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { postJoin, postVerifyEmail, postVerifyEmailSend } from './join.api';

export const verifyEmailSendMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmailSend>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['join/postVerifyEmailSend'],
    mutationFn: postVerifyEmailSend,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const verifyEmailMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postVerifyEmail>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['join/postVerifyEmail'],
    mutationFn: postVerifyEmail,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));

export const joinMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postJoin>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postJoin'],
    mutationFn: postJoin,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
