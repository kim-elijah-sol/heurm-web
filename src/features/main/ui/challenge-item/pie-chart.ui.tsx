import clsx from 'clsx';
import { type Accessor, type Component } from 'solid-js';
import {
  CHALLENGE_STROKE_200,
  CHALLENGE_TEXT_COLOR_300,
  CHALLENGE_TEXT_COLOR_500,
} from '~/shared/constant';
import type { FlowColor } from '~/shared/types';

type Props = {
  percentage: Accessor<number>;
  color: Accessor<FlowColor>;
  complete: Accessor<boolean>;
  opacity?: Accessor<number>;
};

export const PieChart: Component<Props> = (props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 220 220'
      class={clsx(
        'transition-all duration-500',
        props.complete()
          ? CHALLENGE_TEXT_COLOR_500[props.color()]
          : CHALLENGE_TEXT_COLOR_300[props.color()]
      )}
    >
      <circle
        cx='110'
        cy='110'
        r='90'
        fill='none'
        stroke-width='30'
        class={clsx(
          'transition-all duration-500',
          CHALLENGE_STROKE_200[props.color()]
        )}
      />
      <circle
        cx='110'
        cy='110'
        r='90'
        fill='none'
        stroke='currentColor'
        stroke-width='30'
        stroke-dasharray={`${5.655 * props.percentage()} 10000`}
        stroke-dashoffset='0'
        transform='rotate(-90 110 110)'
        stroke-linecap={props.percentage() !== 0 ? 'round' : undefined}
        class='transition-all duration-500'
        opacity={props.opacity?.() ?? 1}
      />
    </svg>
  );
};
