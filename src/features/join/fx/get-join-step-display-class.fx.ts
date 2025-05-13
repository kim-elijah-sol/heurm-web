import { RollingDisplayType } from '~/shared/model';

export const getJoinStepDisplayClass = (displayType: RollingDisplayType) => {
  const displayMap: { [key in RollingDisplayType]: string } = {
    current: '-translate-y-1/2 opacity-100',
    ready: 'translate-y-full opacity-0 pointer-events-none',
    end: '-translate-y-full opacity-0 pointer-events-none',
  };

  return displayMap[displayType];
};
