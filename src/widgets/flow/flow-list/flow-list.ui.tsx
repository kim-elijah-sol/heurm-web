import { Accessor, children, Index, Match, Switch, type JSX } from 'solid-js';
import { flowQueries, type FlowType } from '~/entities/flow';
import { waveQueries, type WaveType } from '~/entities/wave';
import { filterValidFlow, groupingFlowByWave } from '~/features/flow/fx';
import { FlowItem, NoFlow } from '~/features/flow/ui';
import { createDateSelect } from '~/features/main/hook';

export const FlowList = () => {
  return (
    <FlowListSuspense>
      {(flows, wave) => (
        <div class='flex flex-col gap-5'>
          <Index each={groupingFlowByWave(flows(), wave)}>
            {(group) => (
              <div>
                <p class='mb-2 font-semibold ml-2'>{group().wave}</p>
                <div class='flex flex-col gap-3'>
                  <Index each={group().flows}>
                    {(flow) => (
                      <Switch>
                        <Match when={flow().type === 'COMPLETE'}>
                          <FlowItem.Complete flow={flow} />
                        </Match>
                        <Match when={flow().type !== 'COMPLETE'}>
                          <FlowItem.Countable flow={flow} />
                        </Match>
                      </Switch>
                    )}
                  </Index>
                </div>
              </div>
            )}
          </Index>
        </div>
      )}
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
