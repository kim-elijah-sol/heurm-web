import clsx from 'clsx';
import type { Accessor, Component, JSX } from 'solid-js';
import { ChallengeDayStatus } from '~/entities/main/model';
import './date-card.ui.css';

type Props = {
  date: Accessor<Date>;
  isCurrent: Accessor<boolean>;
  isToday: Accessor<boolean>;
  onClick: JSX.CustomEventHandlersCamelCase<HTMLDivElement>['onClick'];
  status: Accessor<ChallengeDayStatus>;
};

export const DateCard: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'date-card rounded-[35%] text-white font-semibold flex items-center justify-center transition-all duration-300 active:scale-90',
        props.status() === 'win'
          ? 'bg-emerald-300 active:bg-emerald-400'
          : props.status() === 'lose'
          ? 'bg-rose-300 active:bg-rose-400'
          : 'bg-gray-300 active:bg-gray-400'
      )}
    >
      {props.date().getDate()}
    </div>
  );
};
