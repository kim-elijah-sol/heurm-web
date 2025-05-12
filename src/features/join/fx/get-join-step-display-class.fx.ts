import { JoinStepDisplayType } from '~/entities/join/model';

export const getJoinStepDisplayClass = (displayType: JoinStepDisplayType) => {
  const displayMap: { [key in JoinStepDisplayType]: string } = {
    current: '-translate-y-1/2 opacity-100',
    ready: 'translate-y-full opacity-0 pointer-events-none',
    end: '-translate-y-full opacity-0 pointer-events-none',
  };

  return displayMap[displayType];
};
