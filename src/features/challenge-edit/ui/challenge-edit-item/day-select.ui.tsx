import clsx from 'clsx';
import { For, type Component } from 'solid-js';
import { challengeEditHook } from '~/entities/challenge-edit';
import {
  CHALLENGE_300_BG_COLOR,
  CHALLENGE_ACTIVE_BG_200_COLOR,
  CHALLENGE_DAY,
} from '~/shared/constant';
import type { ChallengeDay } from '~/shared/types';

type Props = {
  day: ChallengeDay[];
  onChangeDay: (day: ChallengeDay) => void;
};

export const DaySelect: Component<Props> = (props) => {
  const color = challengeEditHook.useChallengeItemColor();

  return (
    <div class='flex justify-between'>
      <For each={CHALLENGE_DAY}>
        {(it) => (
          <button
            onClick={() => props.onChangeDay(it)}
            class={clsx(
              'w-9 h-9 transition-all active:scale-90 rounded-[42%]',
              CHALLENGE_ACTIVE_BG_200_COLOR[color()],
              props.day.includes(it)
                ? clsx(
                    'text-gray-700 font-black',
                    CHALLENGE_300_BG_COLOR[color()]
                  )
                : 'text-gray-400 font-semibold'
            )}
          >
            {it[0]}
          </button>
        )}
      </For>
    </div>
  );
};
