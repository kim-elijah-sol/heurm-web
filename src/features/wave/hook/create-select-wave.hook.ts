import { createSignal } from 'solid-js';
import { Nullable } from '~/shared/types';

export const createSelectWave = (defaultSelectedWaveId?: Nullable<string>) => {
  const [selectedWave, setSelectedWave] = createSignal<Nullable<string>>(
    defaultSelectedWaveId ?? null
  );

  const handleClickWaveItem = (
    id: Nullable<string>,
    autoNullBlock?: boolean
  ) => {
    if (autoNullBlock) {
      setSelectedWave(id);
      return;
    }

    setSelectedWave(selectedWave() === id ? null : id);
  };

  return [selectedWave, handleClickWaveItem] as const;
};
