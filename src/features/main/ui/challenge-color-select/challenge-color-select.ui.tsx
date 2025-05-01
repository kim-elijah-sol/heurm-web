import clsx from 'clsx';
import { For } from 'solid-js';
import { CHALLENGE_BG_COLOR, CHALLENGE_COLOR } from '~/entities/main';
import { Check } from '~/shared/ui';

type Color = (typeof CHALLENGE_COLOR)[number];

type Props = {
  color: Color;
  setColor: (color: Color) => void;
  className?: string;
};

export const ChallengeColorSelect = (props: Props) => {
  return (
    <div class={clsx('flex flex-col gap-6 w-full', props.className)}>
      <div class='flex justify-evenly'>
        <For each={CHALLENGE_COLOR.slice(0, 4)}>
          {(it) => (
            <button
              onClick={() => props.setColor(it)}
              class={clsx(
                'w-10 h-10 rounded-[35%] flex items-center justify-center',
                CHALLENGE_BG_COLOR[it]
              )}
            >
              {props.color === it && <Check size={20} strokeWidth={3} />}
            </button>
          )}
        </For>
      </div>
      <div class='flex justify-evenly'>
        <For each={CHALLENGE_COLOR.slice(4)}>
          {(it) => (
            <button
              onClick={() => props.setColor(it)}
              class={clsx(
                'w-10 h-10 rounded-[35%] flex items-center justify-center',
                CHALLENGE_BG_COLOR[it]
              )}
            >
              {props.color === it && <Check size={20} strokeWidth={3} />}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};
