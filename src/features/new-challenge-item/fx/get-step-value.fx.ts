import { NewChallengeItemType } from '~/entities/new-challenge-item';

export const getStepValue = (
  step: NewChallengeItemType.NewChallengeItemStepType
): number => {
  const stepValueMap: {
    [key in NewChallengeItemType.NewChallengeItemStepType]: number;
  } = {
    type: 0,
    name: 1,
    count: 2,
    day: 3,
  };

  return stepValueMap[step];
};
