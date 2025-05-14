import { LoginHelperStep } from '~/entities/login-helper/model';

export const getLoginHelperFormHeight = (step: LoginHelperStep) => {
  if (step === 'password') return 208;

  if (step === 'done') return 68;

  return 156;
};
