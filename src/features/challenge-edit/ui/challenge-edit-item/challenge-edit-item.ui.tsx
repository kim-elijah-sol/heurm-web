import clsx from 'clsx';
import { format } from 'date-fns';
import { type Accessor, type Component } from 'solid-js';
import {
  ChallengeEditContext,
  ChallengeEditType,
} from '~/entities/challenge-edit';
import { getWeekWriting } from '~/features/new-challenge-item/fx';
import {
  CHALLENGE_100_BG_COLOR,
  CHALLENGE_DAY,
  CHALLENGE_MONTH,
  CHALLENGE_TEXT_COLOR_500,
} from '~/shared/constant';
import type { ChallengeColor, ChallengeItemIntervalType } from '~/shared/types';
import { DeleteButton } from './delete-button.ui';
import { TypeLabel } from './type-label.ui';

type Props = {
  color: Accessor<ChallengeColor>;
} & Omit<ChallengeEditType.GetChallengeItemResponseItem, 'id'>;

export const ChallengeEditItem: Component<Props> = (props) => {
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

  return (
    <ChallengeEditContext.ChallengeItemColorContext.Provider
      value={props.color}
    >
      <div
        class={clsx(
          'flex flex-col rounded-[22px] p-3 transition-all',
          CHALLENGE_100_BG_COLOR[color()]
        )}
      >
        <div class='flex items-start justify-between mb-3'>
          <div class='flex flex-col gap-1 pl-1'>
            <p class='font-semibold'>{props.name}</p>

            <TypeLabel type={props.type} />
          </div>
          <DeleteButton onDelete={() => {}} />
        </div>

        <div class='flex flex-col pl-1 gap-3'>
          {props.type !== 'COMPLETE' && (
            <>
              <p
                class={clsx(
                  'font-semibold text-[14px]',
                  CHALLENGE_TEXT_COLOR_500[color()]
                )}
              >
                Target : {props.targetCount!} {props.unit ?? ''} /{' '}
                {accumulateTypeText}
              </p>

              <div
                class={`w-full h-[1px] bg-linear-to-r from-transparent via-blue-300 to-transparent`}
              />
            </>
          )}

          <div class='flex flex-col gap-1'>
            <p
              class={clsx(
                'font-semibold text-[14px]',
                CHALLENGE_TEXT_COLOR_500[color()]
              )}
            >
              {intervalText}
            </p>
            {props.months.length > 0 && (
              <p
                class={clsx(
                  'font-semibold text-[12px]',
                  CHALLENGE_TEXT_COLOR_500[color()]
                )}
              >
                • {props.months.map((it) => CHALLENGE_MONTH[it]).join(', ')}
              </p>
            )}
            {props.weeks.length > 0 && (
              <p
                class={clsx(
                  'font-semibold text-[12px]',
                  CHALLENGE_TEXT_COLOR_500[color()]
                )}
              >
                •{' '}
                {props.weeks
                  .map((it) => getWeekWriting(it).replace('Week', ''))
                  .join(', ')}{' '}
                Week
              </p>
            )}
            {props.dates.length > 0 && (
              <p
                class={clsx(
                  'font-semibold text-[12px]',
                  CHALLENGE_TEXT_COLOR_500[color()]
                )}
              >
                •{' '}
                {props.weeks
                  .map((it) => (it === 32 ? 'Last Date' : it))
                  .join(', ')}
              </p>
            )}
            {props.days.length > 0 && (
              <p
                class={clsx(
                  'font-semibold text-[12px]',
                  CHALLENGE_TEXT_COLOR_500[color()]
                )}
              >
                • {props.days.map((it) => CHALLENGE_DAY[it]).join(', ')}
              </p>
            )}
          </div>

          <div
            class={`w-full h-[1px] bg-linear-to-r from-transparent via-blue-300 to-transparent`}
          />

          <p
            class={clsx(
              'font-semibold text-[14px]',
              CHALLENGE_TEXT_COLOR_500[color()]
            )}
          >
            Period :{' '}
            {`${format(props.startAt, 'yyyy.MM.dd')} ~ ${
              props.endAt ? format(props.endAt, 'yyyy.MM.dd') : ''
            }`}
          </p>
        </div>
      </div>
    </ChallengeEditContext.ChallengeItemColorContext.Provider>
  );
};
