import type { Nullable } from '~/shared/types';

export const filteringSelectedWave: <T extends { wave: string }>(
  selectedWave: Nullable<string>
) => (item: T) => boolean =
  (selectedWave) =>
  ({ wave }) => {
    if (selectedWave === 'Every') return true;

    return wave === selectedWave;
  };
