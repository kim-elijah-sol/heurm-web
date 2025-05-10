import { clsx } from 'clsx';
import type { Accessor, Component, JSX } from 'solid-js';
import { getDayText } from '../../fx';

type Props = {
  date: Accessor<Date>;
  isCurrent: Accessor<boolean>;
  onClick: JSX.CustomEventHandlersCamelCase<HTMLDivElement>['onClick'];
};

export const DateCard: Component<Props> = (props) => {
  const date = () => `${props.date().getMonth() + 1}.${props.date().getDate()}`;

  const dayText = () => getDayText(props.date().getDay());

  const cardClassName = () =>
    clsx(
      'flex flex-col items-center rounded-3xl bg-white transition-all shadow-[0_0_8px_4px_rgba(70,70,70,0.05)]',
      props.isCurrent()
        ? 'py-6 min-w-[74px] active:scale-[0.95]'
        : 'py-4 min-w-[60px] opacity-[0.5] active:scale-[0.9]'
    );

  const dateClassName = () =>
    clsx(
      'font-bold transition-all',
      props.isCurrent() ? 'text-xl mb-4' : 'text-sm mb-3'
    );

  const dayClassName = () =>
    clsx(
      'font-semibold text-slate-600 transition-all',
      props.isCurrent() ? 'text-xs' : 'text-[10px]'
    );

  return (
    <div class={cardClassName()} onClick={props.onClick}>
      <p class={dateClassName()}>{date()}</p>
      <span class={dayClassName()}>{dayText()}</span>
    </div>
  );
};
