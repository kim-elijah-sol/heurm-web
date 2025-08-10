import clsx from 'clsx';
import { type Accessor, type Component } from 'solid-js';
import { ServerImage, UserRound } from '~/shared/ui';

type Props = {
  src: Accessor<string | undefined>;
  onClick: () => void;
};

export const UserAvatar: Component<Props> = (props) => {
  const src = () => props.src();

  return (
    <>
      <div
        onClick={props.onClick}
        class={clsx(
          'w-14 h-14 min-w-14 rounded-[42%] overflow-hidden border-gray-300 transition-all duration-300 active:scale-90',
          src() ? 'border' : ''
        )}
      >
        {src() ? (
          <ServerImage src={props.src()!} alt='' class='w-full h-full' />
        ) : (
          <div class='w-full h-full bg-linear-150 from-gray-300 to-gray-300/65 flex items-center justify-center'>
            <UserRound />
          </div>
        )}
      </div>
    </>
  );
};
