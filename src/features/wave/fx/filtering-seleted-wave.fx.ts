import { waveConstant } from '~/entities/wave';
import type { Nullable } from '~/shared/types';

export const filteringSelectedWave: <T extends { wave: string }>(
  selectedWave: Nullable<string>
) => (item: T) => boolean =
  (selectedWave) =>
  ({ wave }) => {
    if (selectedWave === waveConstant.DEFAULT_SELECTED_WAVE_NAME) return true;

    return wave === selectedWave;
  };
