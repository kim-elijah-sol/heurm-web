import { Accessor, Component } from 'solid-js';

type Props = {
  src: Accessor<string>;
  onClick: () => void;
};

export const UserAvatar: Component<Props> = (props) => {
  return (
    <>
      <div
        onClick={props.onClick}
        class='w-12 h-12 rounded-full overflow-hidden border border-gray-300'
      >
        <img src={props.src()} alt='' class='w-full h-full' />
      </div>
    </>
  );
};
