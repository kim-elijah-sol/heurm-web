import clsx from 'clsx';
import { type Accessor, type Component, type JSX } from 'solid-js';
import './date-card.ui.css';

type Props = {
  date: Accessor<Date>;
  isCurrent: Accessor<boolean>;
  isToday: Accessor<boolean>;
  onClick: JSX.CustomEventHandlersCamelCase<HTMLDivElement>['onClick'];
};

export const DateCard: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'date-card relative rounded-[42%] flex overflow-hidden items-center justify-center transition-all duration-300 active:scale-90',
        props.isCurrent()
          ? 'bg-gray-400 active:bg-gray-500'
          : 'bg-gray-300 active:bg-gray-400'
      )}
      onClick={props.onClick}
    >
      <p class='text-white text-lg font-semibold z-2'>
        {props.date().getDate()}
      </p>

      {props.isToday() && (
        <div class='absolute left-1/2 bottom-[6px] -translate-x-1/2 w-1 h-1 rounded-full bg-white z-2' />
      )}
    </div>
  );
};
