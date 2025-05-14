import { LoginHelperStep } from '~/entities/login-helper/model';
import { RollingDisplayType } from '~/shared/model';

export const getLoginHelperStepDisplayType =
  (currentStep: LoginHelperStep, targetStep: LoginHelperStep) =>
  (getStepValue: (step: LoginHelperStep) => number): RollingDisplayType => {
    const currentStepValue = getStepValue(currentStep);
    const targetStepValue = getStepValue(targetStep);

    return currentStepValue === targetStepValue
      ? 'current'
      : currentStepValue > targetStepValue
      ? 'end'
      : 'ready';
  };
