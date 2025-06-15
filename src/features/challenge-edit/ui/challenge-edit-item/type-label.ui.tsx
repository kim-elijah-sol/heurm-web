import { type Component } from 'solid-js';
import type { ChallengeItemType } from '~/shared/types';
import { CheckCheck, ChevronsDown, ChevronsUp } from '~/shared/ui';
import { capitalize } from '../../fx';

type Props = {
  type: Uppercase<ChallengeItemType>;
};

export const TypeLabel: Component<Props> = (props) => {
  const getTypeIcon = () =>
    props.type === 'COMPLETE'
      ? CheckCheck
      : props.type === 'OVER'
      ? ChevronsUp
      : ChevronsDown;

  return (
    <div class='flex items-center gap-1'>
      {getTypeIcon()({
        size: 16,
        strokeWidth: 2,
        className: 'stroke-gray-400',
      })}
      <span class='font-semibold text-[12px] text-gray-400'>
        {capitalize(props.type)} Type
      </span>
    </div>
  );
};
