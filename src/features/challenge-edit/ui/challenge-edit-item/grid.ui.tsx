import clsx from 'clsx';
import { format } from 'date-fns';
import { type Accessor, type Component } from 'solid-js';
import { ChallengeEditType } from '~/entities/challenge-edit';
import { getWeekWriting } from '~/features/new-challenge-item/fx';
import {
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
  CHALLENGE_DAY,
  CHALLENGE_MONTH,
  CHALLENGE_TEXT_COLOR_500,
} from '~/shared/constant';
import type { ChallengeColor, ChallengeItemIntervalType } from '~/shared/types';
import { CheckCheck, ChevronsDown, ChevronsUp, X } from '~/shared/ui';
import { Pencil } from '~/shared/ui/icons/pencil.ui';
import { capitalize } from '../../fx';

type Props = {
  color: Accessor<ChallengeColor>;
  onClickDelete: () => void;
} & Omit<ChallengeEditType.GetChallengeItemResponseItem, 'id'>;

export const Grid: Component<Props> = (props) => {
  const color = () => props.color();

  const getTextForIntervalType = (value: ChallengeItemIntervalType) => {
    return (
      {
        YEARLY: 'Year',
        MONTHLY: 'Month',
        WEEKLY: 'Week',
        DAILY: 'Day',
      } as const
    )[value];
  };

  const intervalTypeText = getTextForIntervalType(props.intervalType);

  const intervalText = (() => {
    if (props.repeatType === 'EVERY') return `Every ${intervalTypeText}`;

    if (props.repeatType === 'N')
      return `Every ${props.repeat} ${intervalTypeText}`;

    return `${props.repeat} ${intervalTypeText} on, ${props.rest} ${intervalTypeText} off`;
  })();

  const accumulateTypeText = getTextForIntervalType(
    props.accumulateType ?? 'DAILY'
  );

  const getTypeIcon = () =>
    props.type === 'COMPLETE'
      ? CheckCheck
      : props.type === 'OVER'
      ? ChevronsUp
      : ChevronsDown;

  return (
    <div
      class={clsx(
        'flex flex-col rounded-[20px] p-2 transition-all',
        CHALLENGE_400_BG_COLOR[color()]
      )}
    >
      <div class='flex flex-col h-full justify-between'>
        <div class='flex flex-col p-1'>
          <div class='flex items-center gap-1 mb-1'>
            {getTypeIcon()({
              size: 16,
              strokeWidth: 2,
              className: 'stroke-white',
            })}
            <span class='font-semibold text-[0.725rem] text-white'>
              {capitalize(props.type)} Type
            </span>
          </div>
          <p class='font-semibold text-white text-lg'>{props.name}</p>

          <div
            class={`w-full h-[1px] bg-linear-to-r from-transparent via-white to-transparent mt-3 mb-2`}
          />

          <div class='flex flex-col'>
            {props.type !== 'COMPLETE' && (
              <>
                <p class='font-semibold text-[0.8rem] text-white'>
                  {props.targetCount!} {props.unit ?? ''} / {accumulateTypeText}
                </p>

                <div
                  class={`w-full h-[1px] bg-linear-to-r from-transparent via-white to-transparent my-2`}
                />
              </>
            )}
          </div>

          <div class='flex flex-col gap-1'>
            <p class='font-semibold text-[0.8rem] text-white'>{intervalText}</p>
            {props.months.length > 0 && (
              <div class='font-semibold text-[0.7rem] text-white/85 flex gap-1'>
                <p>•</p>
                <p>
                  {props.months.map((it) => CHALLENGE_MONTH[it]).join(', ')}
                </p>
              </div>
            )}
            {props.weeks.length > 0 && (
              <div class='font-semibold text-[0.7rem] text-white/85 flex gap-1'>
                <p>•</p>
                <p>
                  {props.weeks
                    .map((it) => getWeekWriting(it).replace('Week', ''))
                    .join(', ')}{' '}
                  Week
                </p>
              </div>
            )}
            {props.dates.length > 0 && (
              <div class='font-semibold text-[0.7rem] text-white/85 flex gap-1'>
                <p>•</p>
                <p>
                  {props.dates
                    .map((it) => (it === 32 ? 'Last Date' : it))
                    .join(', ')}
                </p>
              </div>
            )}
            {props.days.length > 0 && (
              <div class='font-semibold text-[0.7rem] text-white/85 flex gap-1'>
                <p>•</p>
                <p>{props.days.map((it) => CHALLENGE_DAY[it]).join(', ')}</p>
              </div>
            )}
          </div>

          <div
            class={`w-full h-[1px] bg-linear-to-r from-transparent via-white to-transparent my-2`}
          />

          <p class='font-semibold text-[0.8rem] text-white'>
            {`${format(props.startAt, 'yyyy.MM.dd')} ~ ${
              props.endAt ? format(props.endAt, 'yyyy.MM.dd') : ''
            }`}
          </p>
        </div>

        <div class='flex gap-2 mt-2'>
          <button
            class={clsx(
              'rounded-[16px] h-10 flex-1 font-semibold text-white transition-all flex justify-center items-center active:scale-90',
              CHALLENGE_400_BG_COLOR[color()],
              CHALLENGE_ACTIVE_BG_500_COLOR[color()]
            )}
            onClick={props.onClickDelete}
          >
            <X size={24} stroke='currentColor' />
          </button>
          <button
            class={clsx(
              'bg-white rounded-[16px] h-10 flex-2 font-semibold transition-all flex justify-center items-center active:bg-gray-300 active:scale-90',
              CHALLENGE_TEXT_COLOR_500[color()]
            )}
          >
            <Pencil size={20} stroke='currentColor' />
          </button>
        </div>
      </div>
    </div>
  );
};
