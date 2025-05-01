import clsx from 'clsx';
import { For } from 'solid-js';
import {
  CHALLENGE_100_BG_COLOR,
  CHALLENGE_200_BG_COLOR,
  CHALLENGE_300_BG_COLOR,
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_200_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
  CHALLENGE_COLOR,
  CHALLENGE_FOCUS_BG_300_COLOR,
} from '~/entities/main';
import { X } from '~/shared/ui';
import { capitalize } from '../../fx';

type Props = {
  type: 'over' | 'under';
  value: string;
  color: (typeof CHALLENGE_COLOR)[number];
};

export const ChallengeSlidePanelCountableItem = (props: Props) => {
  return (
    <div
      class={clsx(
        'flex flex-col rounded-[12px] p-3',
        CHALLENGE_100_BG_COLOR[props.color]
      )}
    >
      <div class='flex items-start justify-between mb-4'>
        <div class='flex flex-col gap-1 pl-1'>
          <input type='text' class='font-semibold' value={props.value} />

          <span class='font-semibold text-[12px] text-gray-400'>
            {capitalize(props.type)} Type
          </span>
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

      <div class='mb-6'>
        <input
          type='number'
          pattern='[0-9]*'
          inputMode='numeric'
          value='82'
          class={clsx(
            'font-semibold px-3 py-2 rounded-[12px] w-full transition-all',
            CHALLENGE_200_BG_COLOR[props.color],
            CHALLENGE_FOCUS_BG_300_COLOR[props.color]
          )}
          placeholder='Target'
        />
      </div>

      <div class='flex justify-between'>
        <For each={['S', 'M', 'T', 'W', 'T', 'F', 'S']}>
          {(it) => (
            <button
              class={clsx(
                'w-8 h-8 transition-all active:scale-90 rounded-[35%]',
                CHALLENGE_ACTIVE_BG_200_COLOR[props.color],
                it === 'S' || it === 'T'
                  ? clsx(
                      'text-gray-700 font-black',
                      CHALLENGE_300_BG_COLOR[props.color]
                    )
                  : 'text-gray-400 font-semibold'
              )}
            >
              {it}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};
