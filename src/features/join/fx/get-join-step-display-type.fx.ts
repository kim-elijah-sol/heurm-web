import { LoginHelperStep, RollingDisplayType } from '~/shared/model';
import { getJoinStepValue } from './get-join-step-value.fx';

export const getJoinStepDisplayType = (
  currentStep: LoginHelperStep,
  targetStep: LoginHelperStep
): RollingDisplayType => {
  const currentStepValue = getJoinStepValue(currentStep);
  const targetStepValue = getJoinStepValue(targetStep);

  return currentStepValue === targetStepValue
    ? 'current'
    : currentStepValue > targetStepValue
    ? 'end'
    : 'ready';
};
