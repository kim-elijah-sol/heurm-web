import clsx from 'clsx';
import { Accessor } from 'solid-js';
import {
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
  CHALLENGE_FROM_300_BG_COLOR,
} from '~/shared/constant';
import { ChallengeColor } from '~/shared/model';

type Props = {
  color: Accessor<ChallengeColor>;
};

export const ChallengeEditSaveButton = (props: Props) => {
  return (
    <div class='absolute bottom-0 left-0 right-0 p-4 pt-8 bg-linear-to-t from-white via-white via-60% to-white/0'>
      <button
        class={clsx(
          'w-full text-white font-semibold h-12 rounded-[12px] transition-all active:scale-95',
          CHALLENGE_400_BG_COLOR[props.color()],
          CHALLENGE_ACTIVE_BG_500_COLOR[props.color()]
        )}
      >
        Save
      </button>

      <div
        class={clsx(
          'absolute left-0 bottom-0 right-0 h-[32px] bg-linear-to-t blur-md to-white rounded-[50%] translate-y-[24px]',
          CHALLENGE_FROM_300_BG_COLOR[props.color()]
        )}
      />
    </div>
  );
};
