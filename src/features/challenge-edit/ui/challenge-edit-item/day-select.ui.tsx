import clsx from 'clsx';
import { Component, For } from 'solid-js';
import { useChallengeItemColor } from '~/entities/challenge-edit/context';
import {
  CHALLENGE_300_BG_COLOR,
  CHALLENGE_ACTIVE_BG_200_COLOR,
  CHALLENGE_DAY,
} from '~/shared/constant';
import { ChallengeDay } from '~/shared/model';

type Props = {
  day: ChallengeDay[];
  onChangeDay: (day: ChallengeDay) => void;
};

export const DaySelect: Component<Props> = (props) => {
  const color = useChallengeItemColor();

  return (
    <div class='flex justify-between'>
      <For each={CHALLENGE_DAY}>
        {(it) => (
          <button
            onClick={() => props.onChangeDay(it)}
            class={clsx(
              'w-8 h-8 transition-all active:scale-90 rounded-[35%]',
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
