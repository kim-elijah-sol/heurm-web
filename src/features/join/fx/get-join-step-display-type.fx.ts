import { JoinStep } from '~/entities/join/model';
import { RollingDisplayType } from '~/shared/model';
import { getJoinStepValue } from './get-join-step-value.fx';

export const getJoinStepDisplayType = (
  currentStep: JoinStep,
  targetStep: JoinStep
): RollingDisplayType => {
  const currentStepValue = getJoinStepValue(currentStep);
  const targetStepValue = getJoinStepValue(targetStep);

  return currentStepValue === targetStepValue
    ? 'current'
    : currentStepValue > targetStepValue
    ? 'end'
    : 'ready';
};
