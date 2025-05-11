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
};

export const NewChallengeCTAButton: Component<Props> = (props) => {
  return (
    <button
      type='submit'
      disabled={props.disabled()}
      class={clsx(
        'w-full h-[46px] transition-all rounded-xl text-white font-semibold text-lg',
        props.disabled()
          ? 'bg-gray-300'
          : clsx(
              'active:scale-[0.98]',
              CHALLENGE_BG_COLOR[props.color()],
              CHALLENGE_ACTIVE_BG_400_COLOR[props.color()]
            )
      )}
    >
      Create
    </button>
  );
};
