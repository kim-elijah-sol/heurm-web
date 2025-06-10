import { type LoginHelperType } from '~/entities/login-helper';

export const getLoginHelperFormHeight = (
  step: LoginHelperType.LoginHelperStep
) => {
  if (step === 'password') return 208;

  if (step === 'done') return 68;

  return 156;
};
