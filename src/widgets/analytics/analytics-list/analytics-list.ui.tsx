import { children, For, JSX, Match, Switch } from 'solid-js';
import { flowQueries, FlowType } from '~/entities/flow';
import { waveQueries, WaveType } from '~/entities/wave';
import {
  completeAnalyticsCalc,
  getStartDate,
  overAnalyticsCalc,
  underAnalyticsCalc,
} from '~/features/analytics/fx';
import { AnalyticsItem } from '~/features/analytics/ui';
import { groupingFlowByWave } from '~/features/flow/fx';
import { NoFlow } from '~/features/flow/ui';
import { createSelectWave } from '~/features/wave/hook';
import { WaveItem, WaveList } from '~/features/wave/ui';

export const AnalyticsList = () => {
  const [selectedWave, handleClickWaveItem] = createSelectWave('Every');

  return (
    <AnalyticsListSuspense>
      {(flow, wave) => {
        const startDate = getStartDate(flow);

        const filteringWave: Array<{ id?: string; name: string }> = [
          {
            name: 'Every',
          },
          {
            name: 'None Wave',
          },
        ].concat(wave);

        return (
          <>
            <WaveList.Scrollable className='mt-6 mb-4'>
              <For each={filteringWave}>
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

            <div class='flex flex-col gap-5'>
              <For
                each={groupingFlowByWave(flow, wave).filter(({ wave }) => {
                  if (selectedWave() === 'Every') return true;

                  return wave === selectedWave();
                })}
              >
                {(group) => (
                  <div>
                    <p class='mb-2 font-semibold ml-2'>{group.wave}</p>
                    <div class='flex flex-col gap-3'>
                      <For each={group.flows}>
                        {(flow) => (
                          <AnalyticsItem
                            flow={() => flow}
                            startDate={startDate}
                            analyticsCalcFx={
                              flow.type === 'COMPLETE'
                                ? completeAnalyticsCalc
                                : flow.type === 'OVER'
                                ? overAnalyticsCalc
                                : underAnalyticsCalc
                            }
                          />
                        )}
                      </For>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </>
        );
      }}
    </AnalyticsListSuspense>
  );
};

const AnalyticsListSuspense = (props: {
  children: (
    flow: FlowType.GetFlowResponse,
    wave: WaveType.GetWaveResponse
  ) => JSX.Element;
}) => {
  const flow = flowQueries.getFlowQuery();

  const wave = waveQueries.getWaveQuery();

  return (
    <Switch fallback={children(() => props.children(flow.data!, wave.data!))()}>
      <Match when={flow.isPending || wave.isPending}>
        <></>
      </Match>
      <Match when={flow.data!.length === 0}>
        <NoFlow />
      </Match>
    </Switch>
  );
};
