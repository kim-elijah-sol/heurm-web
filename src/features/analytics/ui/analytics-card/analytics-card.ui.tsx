import clsx from 'clsx';
import { children, Component, JSX } from 'solid-js';
import { capitalize } from '~/features/challenge-edit/fx';
import {
  CHALLENGE_100_BG_COLOR,
  CHALLENGE_300_BG_COLOR,
} from '~/shared/constant';
import type { ChallengeItemType, FlowColor, Nullable } from '~/shared/types';
import {
  CheckCheck,
  ChevronsDown,
  ChevronsUp,
  WandSparkles,
} from '~/shared/ui';

type Props = {
  color: FlowColor;
  name: string;
  children: JSX.Element;
  type: ChallengeItemType;
  targetCount: Nullable<number>;
};

export const AnalyticsCard: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'overflow-hidden w-full rounded-lg',
        CHALLENGE_100_BG_COLOR[props.color]
      )}
    >
      <div
        class={clsx(
          'pl-4 pr-2 py-2 flex items-center justify-between',
          CHALLENGE_300_BG_COLOR[props.color]
        )}
      >
        <div>
          <p class='font-semibold text-white mb-1'>{props.name}</p>
          <div class='flex items-center'>
            <TypeLabel type={props.type} />
            {props.targetCount && (
              <div class='flex items-center font-semibold text-[12px] text-white/75'>
                <div class='bg-white/75 w-1 h-1 rounded-full mx-2' />{' '}
                {props.targetCount}
              </div>
            )}
          </div>
        </div>

        <div class='p-[6px] rounded-[25%] transition-all active:bg-[#FFFFFF30] active:scale-90'>
          <WandSparkles />
        </div>
      </div>
      <div class='px-2'>{children(() => props.children)()}</div>
    </div>
  );
};

const TypeLabel: Component<{ type: ChallengeItemType }> = (props) => {
  const TypeIcon =
    props.type === 'complete'
      ? CheckCheck
      : props.type === 'over'
      ? ChevronsUp
      : ChevronsDown;

  return (
    <div class='flex items-center gap-1'>
      <TypeIcon className='stroke-white/75' size={16} strokeWidth={2} />
      <span class='font-semibold text-[12px] text-white/75'>
        {capitalize(props.type)} Type
      </span>
    </div>
  );
};
