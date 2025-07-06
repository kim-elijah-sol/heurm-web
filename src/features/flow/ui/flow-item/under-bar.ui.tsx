import { type Accessor, type Component } from 'solid-js';
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
        class='absolute left-0 right-0 h-[2px] z-2 bg-gray-400'
        style={{
          top: lineTop(),
        }}
      />

      <div
        class='w-[14px] rounded-tr-sm rounded-tl-sm transition-all duration-500 overflow-hidden relative bg-white'
        style={{
          height: `${Math.min((value() / targetValue()) * 100, 100)}%`,
        }}
      >
        {lineTop() !== '0%' && (
          <div
            class='absolute top-0 left-0 right-0 bg-gray-300'
            style={{
              height: lineTop(),
            }}
          />
        )}
      </div>
    </div>
  );
};
