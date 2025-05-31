import { useMutation } from '@tanstack/solid-query';
import { AxiosResponse } from 'axios';
import { postLogin } from '../api';
import { LoginResponse } from '../model';

export const useLoginMutation = (
  onSuccess: (response: AxiosResponse<LoginResponse>) => Promise<void>
) =>
  useMutation(() => ({
    mutationFn: postLogin,
    mutationKey: ['postLogin'],
    onSuccess,
  }));
