import { LoginHelperType } from '~/entities/login-helper';
import { RollingDisplayType } from '~/shared/types';

export const getLoginHelperStepDisplayType =
  (
    currentStep: LoginHelperType.LoginHelperStep,
    targetStep: LoginHelperType.LoginHelperStep
  ) =>
  (
    getStepValue: (step: LoginHelperType.LoginHelperStep) => number
  ): RollingDisplayType => {
    const currentStepValue = getStepValue(currentStep);
    const targetStepValue = getStepValue(targetStep);

    return currentStepValue === targetStepValue
      ? 'current'
      : currentStepValue > targetStepValue
      ? 'end'
      : 'ready';
  };
