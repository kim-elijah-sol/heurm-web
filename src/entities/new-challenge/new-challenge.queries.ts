import { useMutation } from '@tanstack/solid-query';
import { toastAtError } from '~/shared/fx';
import { postChallenge } from './new-challenge.api';

export const postChallengeMutation = (
  onSuccess: (data: Awaited<ReturnType<typeof postChallenge>>) => void
) =>
  useMutation(() => ({
    mutationKey: ['postChallenge'],
    mutationFn: postChallenge,
    onSuccess,
    onError: (error) => toastAtError(error),
  }));
