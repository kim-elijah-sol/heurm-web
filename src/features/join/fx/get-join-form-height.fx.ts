import { LoginHelperStep } from '~/shared/model';

export const getJoinFormHeight = (step: LoginHelperStep) => {
  if (step === 'password') return 208;

  if (step === 'done') return 68;

  return 156;
};
