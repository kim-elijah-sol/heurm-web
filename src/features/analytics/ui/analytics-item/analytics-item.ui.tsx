import clsx from 'clsx';
import { Accessor, Component, For, onMount } from 'solid-js';
import { analyticsConstant } from '~/entities/analytics';
import { FlowType } from '~/entities/flow';
import { historyQueries } from '~/entities/history';
import {
  FLOW_BG_100,
  FLOW_BG_100_15,
  FLOW_BG_200,
  FLOW_BG_300,
  FLOW_BG_500,
  FLOW_BORDER_200,
  FLOW_BORDER_200_50,
  FLOW_BORDER_300_50,
  FLOW_BORDER_400_50,
  FLOW_BORDER_600_50,
} from '~/shared/constant';
import { dateFormat } from '~/shared/fx';
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

  const gap = () =>
    flow().accumulateType !== 'DAILY' && flow().accumulateType !== null
      ? analyticsConstant.ANALYTICS_ITEM_SQUARE_GAP_FOR_ACCUMULATE
      : analyticsConstant.ANALYTICS_ITEM_SQUARE_GAP;

  onMount(() => {
    scrollView.scrollTo({ left: timelineView.clientWidth });
  });

  return (
    <div
      class={clsx(
        'border py-2 rounded-[12px]',
        FLOW_BORDER_200[color()],
        FLOW_BG_100_15[color()]
      )}
    >
      <div class='flex items-center justify-between mb-2 px-2'>
        <p class='font-semibold text-sm text-gray-800 pl-0.5'>{flow().name}</p>

        <p class='font-medium text-xs text-gray-400/75'>
          {dateFormat['yyyy.MM.dd'](flow().startAt)} ~{' '}
          {flow().endAt && dateFormat['yyyy.MM.dd'](flow().endAt!)}
        </p>
      </div>
      <div
        class='w-full overflow-x-auto py-0.5'
        ref={(ref) => (scrollView = ref)}
      >
        <div
          class='flex flex-col flex-wrap items-start w-max mx-2'
          style={{
            height: `${
              analyticsConstant.ANALYTICS_ITEM_SQUARE_SIZE * 7 + gap() * 6
            }px`,
            gap: `${gap()}px`,
          }}
          ref={(ref) => (timelineView = ref)}
        >
          <div
            style={{
              width: `${analyticsConstant.ANALYTICS_ITEM_SQUARE_SIZE}px`,
              height: `${
                day() * analyticsConstant.ANALYTICS_ITEM_SQUARE_SIZE +
                Math.max(day() - 1, 0) * gap()
              }px`,
            }}
          ></div>
          <For each={result()}>
            {({ result, accumulateGroupPosition }) => (
              <div
                style={{
                  width: `${analyticsConstant.ANALYTICS_ITEM_SQUARE_SIZE}px`,
                  height: `${analyticsConstant.ANALYTICS_ITEM_SQUARE_SIZE}px`,
                }}
                class={clsx(
                  'rounded-[4px] border relative',
                  result === 'past' && 'bg-gray-100 border-gray-200/50',
                  result === 'rest' && 'bg-gray-200/85 border-gray-300/50',
                  result === 'not-recored' && 'bg-gray-300 border-gray-400/50',
                  result === 0 &&
                    clsx(FLOW_BG_100[color()], FLOW_BORDER_200_50[color()]),
                  result === 1 &&
                    clsx(FLOW_BG_200[color()], FLOW_BORDER_300_50[color()]),
                  result === 2 &&
                    clsx(FLOW_BG_300[color()], FLOW_BORDER_400_50[color()]),
                  result === 3 &&
                    clsx(FLOW_BG_500[color()], FLOW_BORDER_600_50[color()])
                )}
              >
                {accumulateGroupPosition === 'first' && (
                  <div
                    class={clsx(
                      'absolute -inset-[3px] border border-b-0 rounded-[5px] rounded-b-none',
                      FLOW_BORDER_200[color()]
                    )}
                  />
                )}
                {accumulateGroupPosition === 'middle' && (
                  <div
                    class={clsx(
                      'absolute -left-[3px] -right-[3px] -top-[5px] -bottom-[5px] border border-y-0 rounded-[5px] rounded-t-none rounded-b-none',
                      FLOW_BORDER_200[color()]
                    )}
                  />
                )}
                {accumulateGroupPosition === 'last' && (
                  <div
                    class={clsx(
                      'absolute -inset-[3px] border border-t-0 rounded-[5px] rounded-t-none',
                      FLOW_BORDER_200[color()]
                    )}
                  />
                )}
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
