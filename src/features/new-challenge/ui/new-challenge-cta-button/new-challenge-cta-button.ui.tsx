import clsx from 'clsx';
import { Accessor, Component } from 'solid-js';
import {
  CHALLENGE_ACTIVE_BG_400_COLOR,
  CHALLENGE_BG_COLOR,
} from '~/shared/constant';
import { ChallengeColor } from '~/shared/model';

type Props = {
  color: Accessor<ChallengeColor>;
  disabled: Accessor<boolean>;
  onClick: () => void;
};

export const NewChallengeCTAButton: Component<Props> = (props) => {
  return (
    <button
      class={clsx(
        'w-full h-[46px] transition-all active:scale-[0.98] rounded-xl text-white font-semibold text-lg',
        props.disabled() ? 'bg-gray-300' : CHALLENGE_BG_COLOR[props.color()],
        CHALLENGE_ACTIVE_BG_400_COLOR[props.color()]
      )}
      onClick={props.onClick}
    >
      Create
    </button>
  );
};
