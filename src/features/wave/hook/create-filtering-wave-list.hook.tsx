import { For } from 'solid-js';
import { waveConstant, waveQueries, type WaveType } from '~/entities/wave';
import type { PickedPartial } from '~/shared/types';
import { WaveItem, WaveList } from '../ui';
import { createSelectWave } from './create-select-wave.hook';

export const createFilteringWaveList = () => {
  const wave = waveQueries.getWaveQuery();

  const [selectedWave, handleClickWaveItem] = createSelectWave(
    waveConstant.DEFAULT_SELECTED_WAVE_NAME
  );

  const waveList = (): PickedPartial<WaveType.GetWaveResponseItem, 'id'>[] =>
    waveConstant.FILTERING_WAVE_LIST.concat(wave.data ?? []);

  const filteringWaveList = (props?: { className?: string }) => (
    <>
      <WaveList.Scrollable className={props?.className}>
        <For each={waveList()}>
          {(wave) => (
            <WaveItem.OnlySelectable
              selected={() => selectedWave() === wave.name}
              onClick={() => handleClickWaveItem(wave.name, true)}
            >
              {wave.name}
            </WaveItem.OnlySelectable>
          )}
        </For>
      </WaveList.Scrollable>
    </>
  );

  return [selectedWave, filteringWaveList] as const;
};
