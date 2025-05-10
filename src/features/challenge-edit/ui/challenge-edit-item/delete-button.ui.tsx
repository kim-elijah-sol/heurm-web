import clsx from 'clsx';
import { useChallengeItemColor } from '~/entities/challenge-edit/context';
import {
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
} from '~/shared/constant';
import { X } from '~/shared/ui';

export const DeleteButton = () => {
  const color = useChallengeItemColor();

  return (
    <button
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
