import clsx from 'clsx';
import { type Component } from 'solid-js';
import { challengeEditHook } from '~/entities/challenge-edit';
import {
  CHALLENGE_200_BG_COLOR,
  CHALLENGE_FOCUS_BG_300_COLOR,
} from '~/shared/constant';

type Props = {
  unit: string;
  onChangeUnit: (unit: string) => void;
};

export const UnitInput: Component<Props> = (props) => {
  const color = challengeEditHook.useChallengeItemColor();

  return (
    <input
      type='text'
      value={props.unit}
      onInput={(e) => props.onChangeUnit(e.target.value)}
      class={clsx(
        'font-semibold px-3 py-2 rounded-[16px] w-[30%] transition-all',
        CHALLENGE_200_BG_COLOR[color()],
        CHALLENGE_FOCUS_BG_300_COLOR[color()]
      )}
      placeholder='Unit'
    />
  );
};
