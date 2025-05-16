import { createSignal } from 'solid-js';
import { NewChallengeItemStepType } from '~/entities/new-challenge-item/model';
import {
  ChallengeItemType,
  Nullable,
  RollingDisplayType,
} from '~/shared/model';
import { getStepValue } from '../fx';
import { createChallengeItemDay } from './create-challenge-item-day.hook';

export const createNewChallengeItemForm = () => {
  const [step, setStep] = createSignal<NewChallengeItemStepType>('type');

  const [type, setType] = createSignal<Nullable<ChallengeItemType>>(null);

  const [name, setName] = createSignal<string>('');

  const [count, setCount] = createSignal<string>('');

  const [day, handleChangeDay] = createChallengeItemDay();

  const getDisplayType =
    (_step: NewChallengeItemStepType) => (): RollingDisplayType => {
      const currentStepValue = getStepValue(step());
      const targetStepValue = getStepValue(_step);

      return currentStepValue === targetStepValue
        ? 'current'
        : currentStepValue > targetStepValue
        ? 'end'
        : 'ready';
    };

  return {
    setStep,
    type,
    setType,
    name,
    setName,
    count,
    setCount,
    day,
    handleChangeDay,
    getDisplayType,
  };
};
