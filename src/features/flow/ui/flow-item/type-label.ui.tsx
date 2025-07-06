import { Component } from 'solid-js';
import { capitalize } from '~/shared/fx';
import { FlowType } from '~/shared/types';
import { CheckCheck, ChevronsDown, ChevronsUp } from '~/shared/ui';

export const TypeLabel: Component<{ type: FlowType }> = (props) => {
  const TypeIcon =
    props.type === 'COMPLETE'
      ? CheckCheck
      : props.type === 'OVER'
      ? ChevronsUp
      : ChevronsDown;

  return (
    <div class='flex items-center gap-1 pl-1'>
      <TypeIcon className='stroke-white/75' size={16} strokeWidth={3} />
      <span class='font-semibold text-[12px] text-white/75'>
        {capitalize(props.type)} Type
      </span>
    </div>
  );
};
