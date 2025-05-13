import { JoinStep } from '~/entities/join/model';

export const getJoinFormHeight = (step: JoinStep) => {
  if (step === 'password') return 208;

  if (step === 'done') return 68;

  return 156;
};
