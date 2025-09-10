import clsx from 'clsx';
import { For, type Accessor, type Component, type Setter } from 'solid-js';
import { FLOW_BG_300, FLOW_COLOR } from '~/shared/constant';
import type { FlowColor } from '~/shared/types';
import { Check } from '~/shared/ui';

type Props = {
  color: Accessor<FlowColor>;
  setColor: Setter<FlowColor>;
  className?: string;
};

export const FlowColorSelect: Component<Props> = (props) => {
  return (
    <div
      data-testid='flow-color-select'
      class={clsx('flex flex-col gap-6 w-full', props.className)}
    >
      <div class='flex justify-evenly'>
        <For each={FLOW_COLOR.slice(0, 4)}>
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
        <For each={FLOW_COLOR.slice(4)}>
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
  color: Accessor<FlowColor>;
  setColor: Setter<FlowColor>;
  isCurrent: Accessor<boolean>;
};

const ColorItem = (props: ColorItemProps) => {
  return (
    <button
      data-testid={`color-item-${props.color()}`}
      type='button'
      onClick={() => props.setColor(props.color())}
      class={clsx(
        'w-10 h-10 rounded-[42%] flex items-center justify-center transition-all active:scale-90 border border-white/30 shadow-[0_0_8px_4px_rgba(255,255,255,0.2)]',
        FLOW_BG_300[props.color()]
      )}
    >
      {props.isCurrent() && <Check size={20} strokeWidth={3} />}
    </button>
  );
};
