import { type Accessor, type Component, type Setter } from 'solid-js';
import type {
  ChallengeColor,
  ChallengeItemMonthlyPattern,
} from '~/shared/types';
import { NewChallengeItemRadio } from '../new-challenge-item-radio';

const MONTHLY_PATTERNS: ChallengeItemMonthlyPattern[] = [
  'Every Week',
  'Select Date',
  'Select Week',
];

type Props = {
  monthlyPattern: Accessor<ChallengeItemMonthlyPattern>;
  setMonthlyPattern: Setter<ChallengeItemMonthlyPattern>;
  color: Accessor<ChallengeColor>;
};

export const NewChallengeItemMonthlyPatternSelect: Component<Props> = (
  props
) => {
  const monthlyPatternStep = () =>
    MONTHLY_PATTERNS.indexOf(props.monthlyPattern());

  return (
    <div class='flex items-center gap-2'>
      <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
        Monthly
      </p>

      <NewChallengeItemRadio step={monthlyPatternStep} class='flex-1'>
        {MONTHLY_PATTERNS.map((it) => (
          <NewChallengeItemRadio.Item
            color={props.color}
            checked={() => props.monthlyPattern() === it}
            onClick={() => props.setMonthlyPattern(it)}
            name='challenge-item-monthly-pattern'
            id={it.toLowerCase().replace(' ', '-')}
          >
            <p class='font-semibold text-[0.75rem] text-center'>{it}</p>
          </NewChallengeItemRadio.Item>
        ))}
      </NewChallengeItemRadio>
    </div>
  );
};
