import { LoginHelperStep, RollingDisplayType } from '~/shared/model';
import { getResetPasswordStepValue } from './get-reset-password-step-value.fx';

export const getResetPasswordStepDisplayType = (
  currentStep: LoginHelperStep,
  targetStep: LoginHelperStep
): RollingDisplayType => {
  const currentStepValue = getResetPasswordStepValue(currentStep);
  const targetStepValue = getResetPasswordStepValue(targetStep);

  return currentStepValue === targetStepValue
    ? 'current'
    : currentStepValue > targetStepValue
    ? 'end'
    : 'ready';
};
