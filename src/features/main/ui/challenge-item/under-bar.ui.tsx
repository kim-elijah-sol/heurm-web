import clsx from 'clsx';
import { type Accessor, type Component } from 'solid-js';
import { FLOW_BG_500 } from '~/shared/constant';
import type { FlowColor } from '~/shared/types';

type Props = {
  color: Accessor<FlowColor>;
  value: Accessor<number>;
  targetValue: Accessor<number>;
};

export const UnderBar: Component<Props> = (props) => {
  const color = () => props.color();
  const value = () => props.value();
  const targetValue = () => props.targetValue();

  const lineTop = () => {
    if (value() <= targetValue()) return `0%`;

    return `${((value() - targetValue()) / value()) * 100}%`;
  };

  return (
    <div class='w-6 h-6 relative flex justify-center items-end'>
      <div
        class='absolute left-0 right-0 h-[2px] transition-all z-2 bg-gray-600'
        style={{
          top: lineTop(),
        }}
      />

      <div
        class={clsx(
          'w-[14px] rounded-tr-sm rounded-tl-sm transition-all overflow-hidden relative',
          FLOW_BG_500[color()]
        )}
        style={{
          height: `${Math.min((value() / targetValue()) * 100, 100)}%`,
        }}
      >
        {lineTop() !== '0%' && (
          <div
            class={clsx(
              'absolute top-0 left-0 right-0',
              color() !== 'red' && color() !== 'pink'
                ? 'bg-red-500'
                : 'bg-blue-500'
            )}
            style={{
              height: lineTop(),
            }}
          />
        )}
      </div>
    </div>
  );
};
