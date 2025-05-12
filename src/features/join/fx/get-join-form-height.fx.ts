import { JoinStep } from '~/entities/join/model';

export const getJoinFormHeight = (step: JoinStep) => {
  if (step === 'email') return 156;

  return 156;
};
