import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import { newChallengeItemConstant } from '~/entities/new-challenge-item';
import { CHALLENGE_TEXT_COLOR_500 } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type {
  ChallengeColor,
  ChallengeItemMonthlyPattern,
} from '~/shared/types';
import { NewChallengeItemDateSelectSheet } from '../new-challenge-item-date-select-sheet';
import { NewChallengeItemRadio } from '../new-challenge-item-radio';

type Props = {
  monthlyPattern: Accessor<ChallengeItemMonthlyPattern>;
  setMonthlyPattern: Setter<ChallengeItemMonthlyPattern>;
  color: Accessor<ChallengeColor>;
  dates: Accessor<number[]>;
  setDates: Setter<number[]>;
};

export const NewChallengeItemMonthlyPatternSelect: Component<Props> = (
  props
) => {
  const monthlyPatternStep = () =>
    newChallengeItemConstant.MONTHLY_PATTERNS.indexOf(props.monthlyPattern());

  const [isDateSelect, openDateSelect, closeDateSelect] = createBoolean();

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
            defaultDay={props.dates}
          />
        )}
      </div>
      {props.monthlyPattern() === 'Select Date' && (
        <p
          class={clsx(
            'font-semibold mt-2 ml-[68px] px-2 text-sm',
            CHALLENGE_TEXT_COLOR_500[props.color()]
          )}
        >
          {props
            .dates()
            .map((it) => (it === 32 ? 'Last Date' : it))
            .join(', ')}
        </p>
      )}
    </div>
  );
};
