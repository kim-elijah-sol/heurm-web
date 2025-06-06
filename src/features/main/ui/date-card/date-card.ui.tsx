import clsx from 'clsx';
import type { Accessor, Component, JSX } from 'solid-js';
import { MainType } from '~/entities/main';
import './date-card.ui.css';

type Props = {
  date: Accessor<Date>;
  isCurrent: Accessor<boolean>;
  isToday: Accessor<boolean>;
  onClick: JSX.CustomEventHandlersCamelCase<HTMLDivElement>['onClick'];
  status: Accessor<MainType.ChallengeDayStatus>;
};

export const DateCard: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'date-card relative rounded-[35%] text-white text-lg font-semibold flex items-center justify-center transition-all duration-300 active:scale-90',
        props.status() === 'win'
          ? props.isCurrent()
            ? 'bg-emerald-400 active:bg-emerald-500'
            : 'bg-emerald-300 active:bg-emerald-400'
          : props.status() === 'lose'
          ? props.isCurrent()
            ? 'bg-rose-400 active:bg-rose-500'
            : 'bg-rose-300 active:bg-rose-400'
          : props.isCurrent()
          ? 'bg-gray-400 active:bg-gray-500'
          : 'bg-gray-300 active:bg-gray-400'
      )}
      onClick={props.onClick}
    >
      {props.date().getDate()}

      {props.isToday() && (
        <div class='absolute left-1/2 bottom-[6px] -translate-x-1/2 w-1 h-1 rounded-full bg-white' />
      )}
    </div>
  );
};
