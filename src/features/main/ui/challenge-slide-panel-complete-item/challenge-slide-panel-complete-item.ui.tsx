import clsx from 'clsx';
import { For } from 'solid-js';
import {
  CHALLENGE_100_BG_COLOR,
  CHALLENGE_300_BG_COLOR,
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_200_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
  CHALLENGE_COLOR,
  CHALLENGE_DAY,
} from '~/entities/main';
import { CheckCheck, X } from '~/shared/ui';

type Props = {
  name: string;
  onChangeName: (name: string) => void;
  day: (typeof CHALLENGE_DAY)[number][];
  onChangeDay: (day: (typeof CHALLENGE_DAY)[number]) => void;
  color: (typeof CHALLENGE_COLOR)[number];
};

export const ChallengeSlidePanelCompleteItem = (props: Props) => {
  return (
    <div
      class={clsx(
        'flex flex-col rounded-[12px] p-3',
        CHALLENGE_100_BG_COLOR[props.color]
      )}
    >
      <div class='flex items-start justify-between mb-6'>
        <div class='flex flex-col gap-1 pl-1'>
          <input
            type='text'
            class='font-semibold'
            value={props.name}
            onInput={(e) => props.onChangeName(e.target.value)}
          />

          <div class='flex items-center gap-1'>
            <CheckCheck className='stroke-gray-400' size={16} strokeWidth={2} />
            <span class='font-semibold text-[12px] text-gray-400'>
              Complete Type
            </span>
          </div>
        </div>
        <button
          class={clsx(
            'p-1 rounded-[35%] transition-all active:scale-90',
            CHALLENGE_400_BG_COLOR[props.color],
            CHALLENGE_ACTIVE_BG_500_COLOR[props.color]
          )}
        >
          <X size={22} />
        </button>
      </div>

      <div class='flex justify-between'>
        <For each={CHALLENGE_DAY}>
          {(it) => (
            <button
              onClick={() => props.onChangeDay(it)}
              class={clsx(
                'w-8 h-8 transition-all active:scale-90 rounded-[35%]',
                CHALLENGE_ACTIVE_BG_200_COLOR[props.color],
                props.day.includes(it)
                  ? clsx(
                      'text-gray-700 font-black',
                      CHALLENGE_300_BG_COLOR[props.color]
                    )
                  : 'text-gray-400 font-semibold'
              )}
            >
              {it[0]}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};
