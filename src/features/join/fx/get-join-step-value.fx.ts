import { type LoginHelperType } from '~/entities/login-helper';

export const getJoinStepValue = (step: LoginHelperType.LoginHelperStep) => {
  const stepValueMap: { [key in LoginHelperType.LoginHelperStep]: number } = {
    email: 0,
    password: 1,
    verify: 2,
    done: 3,
  };

  return stepValueMap[step];
};
