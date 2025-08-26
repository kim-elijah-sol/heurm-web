import clsx from 'clsx';
import { type Accessor, type Component, type JSX } from 'solid-js';

type Props = {
  children: string;
  onClick: JSX.CustomEventHandlersNamespaced<HTMLButtonElement>['on:click'];
  selected: Accessor<boolean>;
};

export const OnlySelecteableWaveItem: Component<Props> = (props) => {
  const backgroundColor = () =>
    props.selected() ? 'bg-slate-200' : 'bg-slate-100';

  const activeBackgroundColor = () =>
    props.selected() ? 'active:bg-slate-400/70' : 'active:bg-slate-200/70';

  const textColor = () => {
    if (props.selected() === false) return 'text-gray-600';

    return 'text-gray-900';
  };

  return (
    <button
      on:click={props.onClick}
      class={clsx(
        'font-semibold px-3 py-1.5 rounded-[16px] transition-all active:scale-95',
        backgroundColor(),
        activeBackgroundColor(),
        textColor()
      )}
    >
      {props.children}
    </button>
  );
};
