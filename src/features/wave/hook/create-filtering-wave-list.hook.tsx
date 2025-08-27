import { createSignal, For } from 'solid-js';
import { flowQueries } from '~/entities/flow';
import { waveConstant, waveQueries, type WaveType } from '~/entities/wave';
import type { PickedPartial } from '~/shared/types';
import { WaveItem, WaveList } from '../ui';

export const createFilteringWaveList = () => {
  const flow = flowQueries.getFlowQuery();

  const flowCount = () => flow.data?.length ?? 0;

  const flowWaveCount = waveQueries.getFlowWaveCountQuery();

  const [selectedWave, setSelectedWave] = createSignal<string>(
    waveConstant.DEFAULT_SELECTED_WAVE_NAME
  );

  const filteringWaveListWithCount = () =>
    waveConstant.FILTERING_WAVE_LIST.map((it) => ({
      ...it,
      flowWaveCount:
        it.name === waveConstant.DEFAULT_SELECTED_WAVE_NAME ? flowCount() : 0,
    }));

  const waveList = (): PickedPartial<
    WaveType.GetFlowWaveCountResponseItem,
    'id'
  >[] => filteringWaveListWithCount().concat(flowWaveCount.data ?? []);

  const filteringWaveList = (props?: { className?: string }) => (
    <>
      <WaveList.Scrollable className={props?.className}>
        <For each={waveList()}>
          {(wave) => (
            <WaveItem.OnlySelectable
              selected={() => selectedWave() === wave.name}
              onClick={() => setSelectedWave(wave.name)}
            >
              {wave.name} {wave.flowWaveCount}
            </WaveItem.OnlySelectable>
          )}
        </For>
      </WaveList.Scrollable>
    </>
  );

  return [selectedWave, filteringWaveList] as const;
};
