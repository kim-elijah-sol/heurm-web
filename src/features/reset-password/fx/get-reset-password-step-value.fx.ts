import { LoginHelperType } from '~/entities/login-helper';

export const getResetPasswordStepValue = (
  step: LoginHelperType.LoginHelperStep
) => {
  const stepValueMap: { [key in LoginHelperType.LoginHelperStep]: number } = {
    email: 0,
    verify: 1,
    password: 2,
    done: 3,
  };

  return stepValueMap[step];
};
