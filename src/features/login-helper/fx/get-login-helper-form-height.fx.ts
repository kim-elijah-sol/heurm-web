import { type LoginHelperType } from '~/entities/login-helper';

export const getLoginHelperFormHeight = (
  step: LoginHelperType.LoginHelperStep
) => {
  if (step === 'password') return 220;

  if (step === 'done') return 72;

  return 168;
};
