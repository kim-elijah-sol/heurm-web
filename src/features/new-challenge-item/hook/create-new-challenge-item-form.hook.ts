import { createSignal } from 'solid-js';
import { type NewChallengeItemType } from '~/entities/new-challenge-item';
import type {
  ChallengeItemType,
  Nullable,
  RollingDisplayType,
} from '~/shared/types';
import { getStepValue } from '../fx';
import { createChallengeItemDay } from './create-challenge-item-day.hook';

export const createNewChallengeItemForm = () => {
  const [step, setStep] =
    createSignal<NewChallengeItemType.NewChallengeItemStepType>('type');

  const [type, setType] =
    createSignal<Nullable<Uppercase<ChallengeItemType>>>(null);

  const [name, setName] = createSignal<string>('');

  const [count, setCount] = createSignal<string>('');

  const [unit, setUnit] = createSignal<string>('');

  const [day, handleChangeDay] = createChallengeItemDay();

  const getDisplayType =
    (_step: NewChallengeItemType.NewChallengeItemStepType) =>
    (): RollingDisplayType => {
      const currentStepValue = getStepValue(step());
      const targetStepValue = getStepValue(_step);

      return currentStepValue === targetStepValue
        ? 'current'
        : currentStepValue > targetStepValue
        ? 'end'
        : 'ready';
    };

  const maxStep = () => {
    if (step() !== 'type') {
      if (type() === 'COMPLETE') return 2;
      return 3;
    }

    return null;
  };

  const currentStep = () => {
    if (type() === 'COMPLETE') {
      return step() === 'name' ? 1 : 2;
    } else {
      return step() === 'name' ? 1 : step() === 'count' ? 2 : 3;
    }
  };

  return {
    setStep,
    type,
    setType,
    name,
    setName,
    count,
    setCount,
    unit,
    setUnit,
    day,
    handleChangeDay,
    getDisplayType,
    maxStep,
    currentStep,
  };
};
