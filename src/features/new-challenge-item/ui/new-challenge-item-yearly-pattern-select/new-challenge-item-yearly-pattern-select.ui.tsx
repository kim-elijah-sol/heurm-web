import { type Accessor, type Component, type Setter } from 'solid-js';
import { newChallengeItemConstant } from '~/entities/new-challenge-item';
import type {
  ChallengeColor,
  ChallengeItemYearlyPattern,
} from '~/shared/types';
import { NewChallengeItemRadio } from '../new-challenge-item-radio';

type Props = {
  yearlyPattern: Accessor<ChallengeItemYearlyPattern>;
  setYearlyPattern: Setter<ChallengeItemYearlyPattern>;
  color: Accessor<ChallengeColor>;
};

export const NewChallengeItemYearlyPatternSelect: Component<Props> = (
  props
) => {
  const yearlyPatternStep = () =>
    newChallengeItemConstant.YEARLY_PATTERNS.indexOf(props.yearlyPattern());

  return (
    <div class='flex items-center gap-2'>
      <p class='font-semibold text-[0.75rem] w-[60px] text-gray-500 pl-2'>
        Yearly
      </p>

      <NewChallengeItemRadio step={yearlyPatternStep} class='flex-1'>
        {newChallengeItemConstant.YEARLY_PATTERNS.map((it) => (
          <NewChallengeItemRadio.Item
            color={props.color}
            checked={() => props.yearlyPattern() === it}
            onClick={() => props.setYearlyPattern(it)}
            name='challenge-item-yearly-pattern'
            id={it.toLowerCase().replace(' ', '-')}
          >
            <p class='font-semibold text-[0.75rem] text-center'>{it}</p>
          </NewChallengeItemRadio.Item>
        ))}
      </NewChallengeItemRadio>
    </div>
  );
};
