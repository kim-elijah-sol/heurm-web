import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import { newChallengeItemConstant } from '~/entities/new-challenge-item';
import { CHALLENGE_DAY, CHALLENGE_TEXT_COLOR_500 } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type {
  ChallengeColor,
  ChallengeItemWeeklyPattern,
} from '~/shared/types';
import { NewChallengeItemDaySelectSheet } from '../new-challenge-item-pattern-select-sheets';
import { NewChallengeItemRadio } from '../new-challenge-item-radio';

type Props = {
  weeklyPattern: Accessor<ChallengeItemWeeklyPattern>;
  setWeeklyPattern: Setter<ChallengeItemWeeklyPattern>;
  color: Accessor<ChallengeColor>;
  days: Accessor<number[]>;
  setDays: Setter<number[]>;
};

export const NewChallengeItemWeeklyPatternSelect: Component<Props> = (
  props
) => {
  const weeklyPatternStep = () =>
    newChallengeItemConstant.WEEKLY_PATTERNS.indexOf(props.weeklyPattern());

  const [isDaySelect, openDaySelect, closeDaySelect] = createBoolean();

  return (
    <div>
      <div class='flex items-center gap-2'>
        <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
          Weekly
        </p>

        <NewChallengeItemRadio step={weeklyPatternStep} class='flex-1'>
          {newChallengeItemConstant.WEEKLY_PATTERNS.map((it) => (
            <NewChallengeItemRadio.Item
              color={props.color}
              checked={() => props.weeklyPattern() === it}
              onClick={() => {
                if (it === 'Every Day') props.setWeeklyPattern(it);
                else openDaySelect();
              }}
              name='challenge-item-weekly-pattern'
              id={it.toLowerCase().replace(' ', '-')}
            >
              <p class='font-semibold text-[0.75rem] text-center'>{it}</p>
            </NewChallengeItemRadio.Item>
          ))}
        </NewChallengeItemRadio>

        {isDaySelect() && (
          <NewChallengeItemDaySelectSheet
            close={closeDaySelect}
            color={props.color}
            onSubmit={(days) => {
              props.setDays(days);
              props.setWeeklyPattern('Select Day');
            }}
            defaultDays={props.days}
          />
        )}
      </div>

      {props.weeklyPattern() === 'Select Day' && (
        <p
          class={clsx(
            'font-semibold mt-2 ml-[68px] px-2 text-sm',
            CHALLENGE_TEXT_COLOR_500[props.color()]
          )}
        >
          {props
            .days()
            .map((it) => CHALLENGE_DAY[it])
            .join(', ')}
        </p>
      )}
    </div>
  );
};
