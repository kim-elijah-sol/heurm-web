import type { RollingDisplayType } from '~/shared/types';

export const getLoginHelperFormStepDisplayClass = (
  displayType: RollingDisplayType
) => {
  const displayMap: { [key in RollingDisplayType]: string } = {
    current: 'login-helper-guide-text-current -translate-y-1/2 opacity-100',
    ready:
      'login-helper-guide-text-ready translate-y-full opacity-0 pointer-events-none',
    end: 'login-helper-guide-text-end -translate-y-full opacity-0 pointer-events-none',
  };

  return displayMap[displayType];
};
