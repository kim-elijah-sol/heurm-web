import clsx from 'clsx';
import { type Component, type JSX } from 'solid-js';

type Props = {
  children: JSX.Element;
  className?: string;
};

export const ScrollableWaveList: Component<Props> = (props) => {
  return (
    <div class={clsx('overflow-x-auto', props.className)}>
      <div class='w-max flex gap-2'>{props.children}</div>
    </div>
  );
};
