import { children, For, JSX, Match, Switch } from 'solid-js';
import { flowQueries, FlowType } from '~/entities/flow';
import { waveQueries, WaveType } from '~/entities/wave';
import { groupingFlowByWave } from '~/features/flow/fx';
import { NoFlow } from '~/features/flow/ui';

export const AnalyticsFlowList = () => {
  return (
    <AnalyticsFlowListSuspense>
      {(flow, wave) => (
        <div class='flex flex-col gap-5'>
          <For each={groupingFlowByWave(flow, wave)}>
            {(group) => (
              <div>
                <p class='mb-2 font-semibold ml-2'>{group.wave}</p>
                <div class='flex flex-col gap-3'>
                  <For each={group.flows}>{(flow) => <div>{flow.id}</div>}</For>
                </div>
              </div>
            )}
          </For>
        </div>
      )}
    </AnalyticsFlowListSuspense>
  );
};

const AnalyticsFlowListSuspense = (props: {
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
