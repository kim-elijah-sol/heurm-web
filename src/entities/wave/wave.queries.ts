import { useQuery } from '@tanstack/solid-query';
import { waveApi } from '.';

export const getWaveQuery = () =>
  useQuery(() => ({
    queryKey: ['getWave'],
    queryFn: () => waveApi.getWave(),
  }));
