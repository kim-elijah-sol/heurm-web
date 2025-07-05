import { useQuery } from '@tanstack/solid-query';
import { flowApi } from '.';

export const getFlowQuery = () =>
  useQuery(() => ({
    queryKey: ['getFlow'],
    queryFn: () => flowApi.getFlow(),
  }));
