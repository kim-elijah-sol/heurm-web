import { JoinStep } from '~/entities/join/model';

export const getJoinGuideTextBoxHeight = (step: JoinStep) => {
  const messageLine: { [key in JoinStep]: number } = {
    email: 1,
    password: 2,
    verify: 2,
    done: 4,
  };

  return messageLine[step] * 28;
};
