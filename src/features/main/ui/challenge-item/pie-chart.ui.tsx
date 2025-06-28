import clsx from 'clsx';
import { type Accessor, type Component } from 'solid-js';
import {
  CHALLENGE_STROKE_200,
  CHALLENGE_TEXT_COLOR_500,
} from '~/shared/constant';
import type { ChallengeColor } from '~/shared/types';

type Props = {
  percentage: Accessor<number>;
  color: Accessor<ChallengeColor>;
};

export const PieChart: Component<Props> = (props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 220 220'
      class={clsx('transition-all', CHALLENGE_TEXT_COLOR_500[props.color()])}
    >
      <circle
        cx='110'
        cy='110'
        r='90'
        fill='none'
        stroke-width='40'
        class={clsx('transition-all', CHALLENGE_STROKE_200[props.color()])}
      />
      {props.percentage() > 0 && (
        <circle
          cx='110'
          cy='110'
          r='90'
          fill='none'
          stroke='currentColor'
          stroke-width='40'
          stroke-dasharray={`${565.5 * props.percentage()} 339.3`}
          stroke-dashoffset='0'
          transform='rotate(-90 110 110)'
          stroke-linecap='round'
          class='transition-all'
        />
      )}
    </svg>
  );
};
