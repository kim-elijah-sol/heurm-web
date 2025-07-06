import { Accessor, children, For, Match, Switch, type JSX } from 'solid-js';
import { flowQueries, FlowType } from '~/entities/flow';
import { NoFlow } from '~/features/flow/ui';

export const FlowList = () => {
  return (
    <FlowListSuspense>
      {(flows) => <For each={flows()}>{(flow) => <div>{flow.name}</div>}</For>}
    </FlowListSuspense>
  );
};

const FlowListSuspense = (props: {
  children: (data: Accessor<FlowType.GetFlowResponse>) => JSX.Element;
}) => {
  const flow = flowQueries.getFlowQuery();

  return (
    <Switch fallback={children(() => props.children(() => flow.data!))()}>
      <Match when={flow.isPending}>
        <></>
      </Match>
      <Match when={flow.data?.length === 0}>
        <NoFlow />
      </Match>
    </Switch>
  );
};
