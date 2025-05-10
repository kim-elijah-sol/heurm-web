import clsx from 'clsx';
import {
  CHALLENGE_ACTIVE_BG_400_COLOR,
  CHALLENGE_BG_COLOR,
} from '~/shared/constant';
import { ChallengeColor } from '~/shared/model';

type Props = {
  color: ChallengeColor;
  disabled: boolean;
  onClick: () => void;
};

export const NewChallengeCTAButton = (props: Props) => {
  const disabled = () => props.disabled;

  const color = () => props.color;

  return (
    <button
      class={clsx(
        'w-full h-[46px] transition-all active:scale-[0.98] rounded-xl text-white font-semibold text-lg',
        disabled() ? 'bg-gray-300' : CHALLENGE_BG_COLOR[color()],
        CHALLENGE_ACTIVE_BG_400_COLOR[color()]
      )}
      onClick={props.onClick}
    >
      Create
    </button>
  );
};
