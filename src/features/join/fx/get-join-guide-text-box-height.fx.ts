import { LoginHelperStep } from '~/shared/model';

export const getJoinGuideTextBoxHeight = (step: LoginHelperStep) => {
  const messageLine: { [key in LoginHelperStep]: number } = {
    email: 1,
    password: 2,
    verify: 2,
    done: 4,
  };

  return messageLine[step] * 28;
};
