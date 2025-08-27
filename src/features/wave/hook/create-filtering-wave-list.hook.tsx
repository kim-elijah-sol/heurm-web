import { createSignal, For } from 'solid-js';
import { flowQueries } from '~/entities/flow';
import { waveConstant, waveQueries, type WaveType } from '~/entities/wave';
import type { PickedPartial } from '~/shared/types';
import { WaveItem, WaveList } from '../ui';

type FilteringWaveItem = PickedPartial<
  WaveType.GetFlowWaveCountResponseItem,
  'id'
>;

export const createFilteringWaveList = () => {
  const flow = flowQueries.getFlowQuery();

  const flowCount = () => flow.data?.length ?? 0;

  const flowWaveCount = waveQueries.getFlowWaveCountQuery();

  const totalFlowWaveCount = () =>
    flowWaveCount.data?.reduce(
      (acc, { flowWaveCount }) => acc + flowWaveCount,
      0
    ) ?? 0;

  const noneWaveFlowCount = () => flowCount() - totalFlowWaveCount();

  const [selectedWave, setSelectedWave] = createSignal<string>(
    waveConstant.DEFAULT_SELECTED_WAVE_NAME
  );

  const filteringWaveListWithCount = () =>
    waveConstant.FILTERING_WAVE_LIST.reduce<FilteringWaveItem[]>((acc, it) => {
      if (it.name === waveConstant.DEFAULT_SELECTED_WAVE_NAME)
        return acc.concat({
          ...it,
          flowWaveCount: flowCount(),
        });

      if (noneWaveFlowCount() > 0)
        return acc.concat({
          ...it,
          flowWaveCount: noneWaveFlowCount(),
        });

      return acc;
    }, []);

  const waveList = () =>
    filteringWaveListWithCount().concat(flowWaveCount.data ?? []);

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
