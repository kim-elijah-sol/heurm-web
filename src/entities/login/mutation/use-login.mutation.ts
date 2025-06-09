import { useMutation } from '@tanstack/solid-query';
import { postLogin } from '../api';

export const useLoginMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postLogin>>) => void
) =>
  useMutation(() => ({
    mutationFn: postLogin,
    mutationKey: ['postLogin'],
    onSuccess,
  }));
