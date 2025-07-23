import { type Component, type JSX } from 'solid-js';

type Props = {
  children: JSX.Element;
};

export const WaveList: Component<Props> = (props) => {
  return (
    <div class='w-full flex gap-x-2 gap-y-1.5 flex-wrap'>{props.children}</div>
  );
};
