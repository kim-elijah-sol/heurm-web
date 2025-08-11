import { Accessor, Component, For } from 'solid-js';
import { FlowType } from '~/entities/flow';
import { historyQueries } from '~/entities/history';
import { AnalyticsCalcFx } from '../../types';

type Props = {
  flow: Accessor<FlowType.GetFlowResponseItem>;
  analyticsCalcFx: AnalyticsCalcFx;
  startDate: Date;
};

export const AnalyticsItem: Component<Props> = (props) => {
  const flow = props.flow;

  const history = historyQueries.getHistoryQuery(() => ({
    flowId: flow().id,
  }));

  const result = () =>
    props.analyticsCalcFx(props.startDate)(flow())(history.data ?? []);

  const day = () => props.startDate.getDay();

  return (
    <div class='flex flex-col flex-wrap gap-[2px] h-24 items-start w-max'>
      <div
        class='w-3'
        style={{
          height: `${day() * 12 + Math.max(day() - 1, 0) * 2}px`,
        }}
      ></div>
      <For each={result()}>
        {(it) => <div class='w-3 h-3 bg-black rounded-[4px]'></div>}
      </For>
    </div>
  );
};
