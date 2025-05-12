import { JoinStep } from '~/entities/join/model';

export const getJoinStepValue = (step: JoinStep) => {
  const stepValueMap: { [key in JoinStep]: number } = {
    email: 0,
    password: 1,
    verify: 2,
    done: 3,
  };

  return stepValueMap[step];
};
