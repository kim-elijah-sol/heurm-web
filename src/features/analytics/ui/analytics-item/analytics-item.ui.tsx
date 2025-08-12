import clsx from 'clsx';
import { Accessor, Component, For, onMount } from 'solid-js';
import { FlowType } from '~/entities/flow';
import { historyQueries } from '~/entities/history';
import {
  FLOW_BG_100,
  FLOW_BG_100_15,
  FLOW_BG_200,
  FLOW_BG_300,
  FLOW_BG_500,
  FLOW_BORDER_200,
} from '~/shared/constant';
import { FlowColor } from '~/shared/types';
import { AnalyticsCalcFx } from '../../types';

type Props = {
  flow: Accessor<FlowType.GetFlowResponseItem>;
  analyticsCalcFx: AnalyticsCalcFx;
  startDate: Date;
};

export const AnalyticsItem: Component<Props> = (props) => {
  let scrollView: HTMLDivElement;

  let timelineView: HTMLDivElement;

  const flow = props.flow;

  const color = () => flow().color as FlowColor;

  const history = historyQueries.getHistoryQuery(() => ({
    flowId: flow().id,
  }));

  const result = () =>
    props.analyticsCalcFx(props.startDate)(flow())(history.data ?? []);

  const day = () => props.startDate.getDay();

  onMount(() => {
    scrollView.scrollTo({ left: timelineView.clientWidth });
  });

  return (
    <div
      class={clsx(
        'border p-2 rounded-[12px]',
        FLOW_BORDER_200[color()],
        FLOW_BG_100_15[color()]
      )}
    >
      <p class='font-semibold text-sm mb-2'>{flow().name}</p>
      <div class='w-full overflow-x-auto' ref={(ref) => (scrollView = ref)}>
        <div
          class='flex flex-col flex-wrap gap-[2px] h-24 items-start w-max'
          ref={(ref) => (timelineView = ref)}
        >
          <div
            class='w-3'
            style={{
              height: `${day() * 12 + Math.max(day() - 1, 0) * 2}px`,
            }}
          ></div>
          <For each={result()}>
            {(it) => (
              <div
                class={clsx(
                  'w-3 h-3 rounded-[4px]',
                  it === 'past' && 'bg-gray-200',
                  it === 'rest' && 'bg-slate-300',
                  it === 0 && FLOW_BG_100[color()],
                  it === 1 && FLOW_BG_200[color()],
                  it === 2 && FLOW_BG_300[color()],
                  it === 3 && FLOW_BG_500[color()]
                )}
              ></div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
