import clsx from 'clsx';
import { type Accessor, type Component, type Setter } from 'solid-js';
import { newChallengeItemConstant } from '~/entities/new-challenge-item';
import { CHALLENGE_TEXT_COLOR_500, FLOW_MONTH } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type { FlowColor, FlowYearlyPattern } from '~/shared/types';
import { NewChallengeItemMonthSelectSheet } from '../new-challenge-item-pattern-select-sheets';
import { NewChallengeItemRadio } from '../new-challenge-item-radio';

type Props = {
  yearlyPattern: Accessor<FlowYearlyPattern>;
  setYearlyPattern: Setter<FlowYearlyPattern>;
  color: Accessor<FlowColor>;
  months: Accessor<number[]>;
  setMonths: Setter<number[]>;
};

export const NewFlowYearlyPatternSelect: Component<Props> = (props) => {
  const yearlyPatternStep = () =>
    newChallengeItemConstant.YEARLY_PATTERNS.indexOf(props.yearlyPattern());

  const [isMonthSelect, openIsMonthSelect, closeMonthSelect] = createBoolean();

  return (
    <div>
      <div class='flex items-center gap-2'>
        <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
          Yearly
        </p>

        <NewChallengeItemRadio step={yearlyPatternStep} class='flex-1'>
          {newChallengeItemConstant.YEARLY_PATTERNS.map((it) => (
            <NewChallengeItemRadio.Item
              color={props.color}
              checked={() => props.yearlyPattern() === it}
              onClick={() => {
                if (it === 'Every Month') props.setYearlyPattern(it);
                else openIsMonthSelect();
              }}
              name='challenge-item-yearly-pattern'
              id={it.toLowerCase().replace(' ', '-')}
            >
              <p class='font-semibold text-[0.75rem] text-center'>{it}</p>
            </NewChallengeItemRadio.Item>
          ))}
        </NewChallengeItemRadio>

        {isMonthSelect() && (
          <NewChallengeItemMonthSelectSheet
            close={closeMonthSelect}
            color={props.color}
            onSubmit={(months) => {
              props.setMonths(months);
              props.setYearlyPattern('Select Month');
            }}
            defaultMonths={props.months}
          />
        )}
      </div>

      {props.yearlyPattern() === 'Select Month' && (
        <p
          class={clsx(
            'font-semibold mt-2 ml-[68px] px-2 text-sm mb-2',
            CHALLENGE_TEXT_COLOR_500[props.color()]
          )}
        >
          {props
            .months()
            .map((it) => FLOW_MONTH[it])
            .join(', ')}
        </p>
      )}
    </div>
  );
};
