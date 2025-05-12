import { JoinStep } from '~/entities/join/model';

export const getJoinFormHeight = (step: JoinStep) => {
  if (step === 'password') return 208;

  return 156;
};
