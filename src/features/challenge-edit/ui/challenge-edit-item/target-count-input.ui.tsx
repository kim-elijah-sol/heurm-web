import clsx from 'clsx';
import { type Component } from 'solid-js';
import { challengeEditHook } from '~/entities/challenge-edit';
import {
  CHALLENGE_200_BG_COLOR,
  CHALLENGE_FOCUS_BG_300_COLOR
} from '~/shared/constant';

type Props = {
  targetCount: number;
  onChangeTargetColor: (targetCount: number) => void;
};

export const TargetCountInput: Component<Props> = (props) => {
  const color = challengeEditHook.useChallengeItemColor();

  return (
    <input
      type='number'
      pattern='[0-9]*'
      inputMode='numeric'
      value={props.targetCount}
      onInput={(e) => props.onChangeTargetColor(Number(e.target.value))}
      class={clsx(
        'font-semibold px-3 py-2 rounded-[12px] w-[70%] transition-all',
        CHALLENGE_200_BG_COLOR[color()],
        CHALLENGE_FOCUS_BG_300_COLOR[color()]
      )}
      placeholder='Target'
    />
  );
};
