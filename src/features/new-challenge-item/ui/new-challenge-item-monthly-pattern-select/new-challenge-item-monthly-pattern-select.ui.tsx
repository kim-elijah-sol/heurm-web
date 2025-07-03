import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import { newChallengeItemConstant } from '~/entities/new-challenge-item';
import { CHALLENGE_TEXT_COLOR_500 } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type { ChallengeItemMonthlyPattern, FlowColor } from '~/shared/types';
import { getWeekWriting } from '../../fx';
import {
  NewChallengeItemDateSelectSheet,
  NewChallengeItemWeekSelectSheet,
} from '../new-challenge-item-pattern-select-sheets';
import { NewChallengeItemRadio } from '../new-challenge-item-radio';

type Props = {
  monthlyPattern: Accessor<ChallengeItemMonthlyPattern>;
  setMonthlyPattern: Setter<ChallengeItemMonthlyPattern>;
  color: Accessor<FlowColor>;
  dates: Accessor<number[]>;
  setDates: Setter<number[]>;
  weeks: Accessor<number[]>;
  setWeeks: Setter<number[]>;
};

export const NewChallengeItemMonthlyPatternSelect: Component<Props> = (
  props
) => {
  const monthlyPatternStep = () =>
    newChallengeItemConstant.MONTHLY_PATTERNS.indexOf(props.monthlyPattern());

  const [isDateSelect, openDateSelect, closeDateSelect] = createBoolean();

  const [isWeekSelect, openWeekSelect, closeWeekSelect] = createBoolean();

  return (
    <div>
      <div class='flex items-center gap-2'>
        <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
          Monthly
        </p>

        <NewChallengeItemRadio step={monthlyPatternStep} class='flex-1'>
          {newChallengeItemConstant.MONTHLY_PATTERNS.map((it) => (
            <NewChallengeItemRadio.Item
              color={props.color}
              checked={() => props.monthlyPattern() === it}
              onClick={() => {
                if (it === 'Every Week') props.setMonthlyPattern(it);
                else if (it === 'Select Date') openDateSelect();
                else if (it === 'Select Week') openWeekSelect();
              }}
              name='challenge-item-monthly-pattern'
              id={it.toLowerCase().replace(' ', '-')}
            >
              <p class='font-semibold text-[0.75rem] text-center'>{it}</p>
            </NewChallengeItemRadio.Item>
          ))}
        </NewChallengeItemRadio>
        {isDateSelect() && (
          <NewChallengeItemDateSelectSheet
            close={closeDateSelect}
            color={props.color}
            onSubmit={(dates) => {
              props.setDates(dates);
              props.setMonthlyPattern('Select Date');
            }}
            defaultDates={props.dates}
          />
        )}
        {isWeekSelect() && (
          <NewChallengeItemWeekSelectSheet
            close={closeWeekSelect}
            color={props.color}
            onSubmit={(weeks) => {
              props.setWeeks(weeks);
              props.setMonthlyPattern('Select Week');
            }}
            defaultWeeks={props.weeks}
          />
        )}
      </div>
      {props.monthlyPattern() === 'Select Date' && (
        <p
          class={clsx(
            'font-semibold mt-2 ml-[68px] px-2 text-sm mb-2',
            CHALLENGE_TEXT_COLOR_500[props.color()]
          )}
        >
          {props
            .dates()
            .map((it) => (it === 32 ? 'Last Date' : it))
            .join(', ')}
        </p>
      )}
      {props.monthlyPattern() === 'Select Week' && (
        <p
          class={clsx(
            'font-semibold mt-2 ml-[68px] px-2 text-sm mb-2',
            CHALLENGE_TEXT_COLOR_500[props.color()]
          )}
        >
          {props.weeks().map(getWeekWriting).join(', ')}
        </p>
      )}
    </div>
  );
};
