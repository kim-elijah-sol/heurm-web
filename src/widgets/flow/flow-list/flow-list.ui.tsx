import { Accessor, children, For, Match, Switch, type JSX } from 'solid-js';
import { flowQueries, type FlowType } from '~/entities/flow';
import { waveQueries, type WaveType } from '~/entities/wave';
import { filterValidFlow, groupingFlowByWave } from '~/features/flow/fx';
import { FlowItem, NoFlow } from '~/features/flow/ui';
import { createDateSelect } from '~/features/main/hook';
import { createSelectWave } from '~/features/wave/hook';
import { WaveItem, WaveList } from '~/features/wave/ui';

export const FlowList = () => {
  const [selectedWave, handleClickWaveItem] = createSelectWave('Every');

  return (
    <FlowListSuspense>
      {(flows, wave) => {
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
            <WaveList.Scrollable className='mb-4'>
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
                each={groupingFlowByWave(flows(), wave).filter(({ wave }) => {
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
                          <Switch>
                            <Match when={flow.type === 'COMPLETE'}>
                              <FlowItem.Complete flow={() => flow} />
                            </Match>
                            <Match when={flow.type !== 'COMPLETE'}>
                              <FlowItem.Countable flow={() => flow} />
                            </Match>
                          </Switch>
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
    </FlowListSuspense>
  );
};

const FlowListSuspense = (props: {
  children: (
    data: Accessor<FlowType.GetFlowResponse>,
    wave: WaveType.GetWaveResponse
  ) => JSX.Element;
}) => {
  const flow = flowQueries.getFlowQuery();

  const { current } = createDateSelect();

  const todayFlow = () =>
    flow.data ? flow.data.filter(filterValidFlow(current().valueOf())) : [];

  const wave = waveQueries.getWaveQuery();

  return (
    <Switch
      fallback={children(() => props.children(todayFlow, wave.data ?? []))()}
    >
      <Match when={flow.isPending || wave.isPending}>
        <></>
      </Match>
      <Match when={todayFlow().length === 0}>
        <NoFlow />
      </Match>
    </Switch>
  );
};
