import clsx from 'clsx';
import { type Accessor, type Component } from 'solid-js';
import { FLOW_TEXT_500 } from '~/shared/constant';
import { capitalize } from '~/shared/fx';
import type { FlowColor, FlowType, Nullable } from '~/shared/types';
import { CheckCheck, ChevronsDown, ChevronsUp } from '~/shared/ui';

type Props = {
  type: FlowType;
  isCompleted?: Accessor<Nullable<boolean>>;
  color: Accessor<FlowColor>;
};

export const TypeLabel: Component<Props> = (props) => {
  const TypeIcon =
    props.type === 'COMPLETE'
      ? CheckCheck
      : props.type === 'OVER'
      ? ChevronsUp
      : ChevronsDown;

  const textColor = () =>
    props.isCompleted?.() ? 'text-white' : FLOW_TEXT_500[props.color()];

  return (
    <div class={clsx('flex items-center gap-1 pl-1 opacity-75', textColor())}>
      <TypeIcon
        className='transition-all duration-500'
        stroke='currentColor'
        size={16}
        strokeWidth={3}
      />
      <span
        class={clsx(
          'transition-all duration-500 font-semibold text-[12px]',
          textColor()
        )}
      >
        {capitalize(props.type)} Type
      </span>
    </div>
  );
};
