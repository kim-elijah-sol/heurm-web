import { LoginHelperStep } from '~/shared/model';

export const getResetPasswordStepValue = (step: LoginHelperStep) => {
  const stepValueMap: { [key in LoginHelperStep]: number } = {
    email: 0,
    verify: 1,
    password: 2,
    done: 3,
  };

  return stepValueMap[step];
};
