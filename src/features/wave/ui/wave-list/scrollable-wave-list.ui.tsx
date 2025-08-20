import { type Component, type JSX } from 'solid-js';

type Props = {
  children: JSX.Element;
};

export const ScrollableWaveList: Component<Props> = (props) => {
  return (
    <div class='overflow-x-auto'>
      <div class='w-max flex gap-2'>{props.children}</div>
    </div>
  );
};
