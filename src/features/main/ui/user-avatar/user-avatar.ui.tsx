import { Accessor } from 'solid-js';

type Props = {
  src: Accessor<string>;
  onClick: () => void;
};

export const UserAvatar = (props: Props) => {
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
