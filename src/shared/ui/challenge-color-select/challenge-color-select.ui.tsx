import clsx from 'clsx';
import { For, type Accessor, type Component, type Setter } from 'solid-js';
import { CHALLENGE_BG_COLOR, CHALLENGE_COLOR } from '~/shared/constant';
import type { ChallengeColor } from '~/shared/types';
import { Check } from '~/shared/ui';

type Props = {
  color: Accessor<ChallengeColor>;
  setColor: Setter<ChallengeColor>;
  className?: string;
};

export const ChallengeColorSelect: Component<Props> = (props) => {
  return (
    <div class={clsx('flex flex-col gap-6 w-full', props.className)}>
      <div class='flex justify-evenly'>
        <For each={CHALLENGE_COLOR.slice(0, 4)}>
          {(it) => (
            <ColorItem
              color={() => it}
              setColor={props.setColor}
              isCurrent={() => it === props.color()}
            />
          )}
        </For>
      </div>
      <div class='flex justify-evenly'>
        <For each={CHALLENGE_COLOR.slice(4)}>
          {(it) => (
            <ColorItem
              color={() => it}
              setColor={props.setColor}
              isCurrent={() => it === props.color()}
            />
          )}
        </For>
      </div>
    </div>
  );
};

type ColorItemProps = {
  color: Accessor<ChallengeColor>;
  setColor: Setter<ChallengeColor>;
  isCurrent: Accessor<boolean>;
};

const ColorItem = (props: ColorItemProps) => {
  return (
    <button
      type='button'
      onClick={() => props.setColor(props.color())}
      class={clsx(
        'w-12 h-12 rounded-[42%] flex items-center justify-center transition-all active:scale-90 border-slate-100 shadow-[0_0_8px_4px_rgba(255,255,255,0.05)]',
        CHALLENGE_BG_COLOR[props.color()]
      )}
    >
      {props.isCurrent() && <Check size={28} strokeWidth={3} />}
    </button>
  );
};
