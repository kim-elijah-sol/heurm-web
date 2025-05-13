import { LoginHelperStep } from '~/shared/model';

export const getJoinStepValue = (step: LoginHelperStep) => {
  const stepValueMap: { [key in LoginHelperStep]: number } = {
    email: 0,
    password: 1,
    verify: 2,
    done: 3,
  };

  return stepValueMap[step];
};
