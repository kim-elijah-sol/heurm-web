import clsx from 'clsx';
import { Component } from 'solid-js';
import { useChallengeItemColor } from '~/entities/challenge-edit/context';
import {
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
} from '~/shared/constant';
import { X } from '~/shared/ui';

type Props = {
  onDelete: () => void;
};

export const DeleteButton: Component<Props> = (props) => {
  const color = useChallengeItemColor();

  return (
    <button
      onClick={props.onDelete}
      class={clsx(
        'p-1 rounded-[35%] transition-all active:scale-90',
        CHALLENGE_400_BG_COLOR[color()],
        CHALLENGE_ACTIVE_BG_500_COLOR[color()]
      )}
    >
      <X size={22} />
    </button>
  );
};
