import { NewChallengeItemStepType } from '~/entities/new-challenge-item/model';

export const getStepValue = (step: NewChallengeItemStepType): number => {
  const stepValueMap: { [key in NewChallengeItemStepType]: number } = {
    type: 0,
    name: 1,
    count: 2,
    day: 3,
  };

  return stepValueMap[step];
};
