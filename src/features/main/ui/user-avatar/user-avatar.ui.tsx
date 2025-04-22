import type { JSX } from 'solid-js';

type Props = {
  src: string;
  onClick?: JSX.CustomEventHandlersNamespaced<HTMLDivElement>['on:click'];
};

export const UserAvatar = (props: Props) => {
  const src = () => props.src;

  return (
    <div
      on:click={props.onClick}
      class='w-12 h-12 rounded-full overflow-hidden border border-gray-300'
    >
      <img src={src()} alt='' class='w-full h-full' />
    </div>
  );
};
