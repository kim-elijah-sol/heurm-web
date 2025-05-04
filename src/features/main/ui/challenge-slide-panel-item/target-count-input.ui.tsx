import clsx from 'clsx';
import {
  CHALLENGE_200_BG_COLOR,
  CHALLENGE_FOCUS_BG_300_COLOR,
} from '~/entities/main';
import { useChallengeItemColor } from '../../context/challenge-item-color/use-challenge-item-color.hook';

type Props = {
  targetCount: number;
  onChangeTargetColor: (targetCount: number) => void;
};

export const TargetCountInput = (props: Props) => {
  const color = useChallengeItemColor();

  return (
    <div class='mb-6'>
      <input
        type='number'
        pattern='[0-9]*'
        inputMode='numeric'
        value={props.targetCount}
        onInput={(e) => props.onChangeTargetColor(Number(e.target.value))}
        class={clsx(
          'font-semibold px-3 py-2 rounded-[12px] w-full transition-all',
          CHALLENGE_200_BG_COLOR[color()],
          CHALLENGE_FOCUS_BG_300_COLOR[color()]
        )}
        placeholder='Target'
      />
    </div>
  );
};
