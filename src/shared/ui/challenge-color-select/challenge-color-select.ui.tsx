import clsx from 'clsx';
import { For } from 'solid-js';
import { CHALLENGE_BG_COLOR, CHALLENGE_COLOR } from '~/shared/constant';
import { ChallengeColor } from '~/shared/model';
import { Check } from '~/shared/ui';

type Props = {
  color: ChallengeColor;
  setColor: (color: ChallengeColor) => void;
  className?: string;
};

export const ChallengeColorSelect = (props: Props) => {
  return (
    <div class={clsx('flex flex-col gap-6 w-full', props.className)}>
      <div class='flex justify-evenly'>
        <For each={CHALLENGE_COLOR.slice(0, 4)}>
          {(it) => (
            <ColorItem
              color={it}
              setColor={props.setColor}
              isCurrent={it === props.color}
            />
          )}
        </For>
      </div>
      <div class='flex justify-evenly'>
        <For each={CHALLENGE_COLOR.slice(4)}>
          {(it) => (
            <ColorItem
              color={it}
              setColor={props.setColor}
              isCurrent={it === props.color}
            />
          )}
        </For>
      </div>
    </div>
  );
};

type ColorItemProps = {
  color: ChallengeColor;
  setColor: (color: ChallengeColor) => void;
  isCurrent: boolean;
};

const ColorItem = (props: ColorItemProps) => {
  return (
    <button
      onClick={() => props.setColor(props.color)}
      class={clsx(
        'w-10 h-10 rounded-[35%] flex items-center justify-center transition-all active:scale-90',
        CHALLENGE_BG_COLOR[props.color]
      )}
    >
      {props.isCurrent && <Check size={20} strokeWidth={3} />}
    </button>
  );
};
