import clsx from 'clsx';
import { type Component } from 'solid-js';
import { challengeEditHook } from '~/entities/challenge-edit';
import { CHALLENGE_ACTIVE_TEXT_COLOR_400 } from '~/shared/constant';
import { X } from '~/shared/ui';

type Props = {
  onDelete: () => void;
};

export const DeleteButton: Component<Props> = (props) => {
  const color = challengeEditHook.useChallengeItemColor();

  return (
    <button
      onClick={props.onDelete}
      class={clsx(
        'p-[6px] rounded-[42%] border-2 text-white border-white transition-all active:scale-90 active:bg-white',
        CHALLENGE_ACTIVE_TEXT_COLOR_400[color()]
      )}
    >
      <X size={24} stroke='currentColor' />
    </button>
  );
};
