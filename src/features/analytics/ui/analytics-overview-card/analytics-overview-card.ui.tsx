import clsx from 'clsx';
import { type Component } from 'solid-js';
import { FLOW_BG_50, FLOW_BORDER_200, FLOW_TEXT_500 } from '~/shared/constant';
import type { FlowColor } from '~/shared/types';

type Props = {
  color: FlowColor;
  title: string;
  count: number;
};

export const AnalyticsOverviewCard: Component<Props> = (props) => {
  const countClass = () =>
    clsx('text-4xl font-extrabold', FLOW_TEXT_500[props.color]);

  return (
    <div
      style={{
        flex: props.count || 1,
      }}
      class={clsx(
        'flex flex-col items-center rounded-lg p-3 transition-all border min-w-[100px]',
        FLOW_BG_50[props.color],
        FLOW_BORDER_200[props.color]
      )}
    >
      <span class='text-sm font-semibold mb-3 text-slate-800'>
        {props.title}
      </span>
      <p class={countClass()}>{props.count.toString()}</p>
    </div>
  );
};
