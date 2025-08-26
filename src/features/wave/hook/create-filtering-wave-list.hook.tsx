import { createSignal, For } from 'solid-js';
import { waveConstant, waveQueries, type WaveType } from '~/entities/wave';
import type { PickedPartial } from '~/shared/types';
import { WaveItem, WaveList } from '../ui';

export const createFilteringWaveList = () => {
  const wave = waveQueries.getWaveQuery();

  const [selectedWave, setSelectedWave] = createSignal<string>(
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
              onClick={() => setSelectedWave(wave.name)}
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
