import { For } from 'solid-js';
import type { WaveType } from '~/entities/wave';
import { waveQueries } from '~/entities/wave';
import type { PickedPartial } from '~/shared/types';
import { WaveItem, WaveList } from '../ui';
import { createSelectWave } from './create-select-wave.hook';

export const createFilteringWaveList = () => {
  const wave = waveQueries.getWaveQuery();

  const [selectedWave, handleClickWaveItem] = createSelectWave('Every');

  const waveList = (): PickedPartial<WaveType.GetWaveResponseItem, 'id'>[] =>
    [
      {
        name: 'Every',
      },
      {
        name: 'None Wave',
      },
    ].concat(wave.data ?? []);

  const filteringWaveList = () => (
    <>
      <WaveList.Scrollable className='mt-6 mb-4'>
        <For each={waveList()}>
          {(wave) => (
            <WaveItem
              selected={() => selectedWave() === wave.name}
              onClick={() => handleClickWaveItem(wave.name, true)}
              id={wave.id}
            >
              {wave.name}
            </WaveItem>
          )}
        </For>
      </WaveList.Scrollable>
    </>
  );

  return [selectedWave, filteringWaveList] as const;
};
