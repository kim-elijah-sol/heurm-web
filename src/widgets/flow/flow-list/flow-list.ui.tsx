import { Accessor, children, For, Match, Switch, type JSX } from 'solid-js';
import { flowQueries, FlowType } from '~/entities/flow';
import { filterValidFlow } from '~/features/flow/fx';
import { FlowItem, NoFlow } from '~/features/flow/ui';
import { createDateSelect } from '~/features/main/hook';

export const FlowList = () => {
  return (
    <FlowListSuspense>
      {(flows) => (
        <div class='flex flex-col gap-3'>
          <For each={flows()}>
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
      )}
    </FlowListSuspense>
  );
};

const FlowListSuspense = (props: {
  children: (data: Accessor<FlowType.GetFlowResponse>) => JSX.Element;
}) => {
  const flow = flowQueries.getFlowQuery();

  const { current } = createDateSelect();

  const todayFlow = () =>
    flow.data ? flow.data.filter(filterValidFlow(current().valueOf())) : [];

  return (
    <Switch fallback={children(() => props.children(todayFlow))()}>
      <Match when={flow.isPending}>
        <></>
      </Match>
      <Match when={todayFlow().length === 0}>
        <NoFlow />
      </Match>
    </Switch>
  );
};
