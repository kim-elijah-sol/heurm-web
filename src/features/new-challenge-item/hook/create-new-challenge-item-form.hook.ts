import { createSignal } from 'solid-js';
import {
  NewChallengeItemStepDisplayType,
  NewChallengeItemStepType,
} from '~/entities/new-challenge-item/model';
import { ChallengeItemType } from '~/shared/model';
import { getStepValue } from '../fx';
import { createChallengeItemDay } from './create-challenge-item-day.hook';

export const createNewChallengeItemForm = () => {
  const [step, setStep] = createSignal<NewChallengeItemStepType>('type');

  const [type, setType] = createSignal<ChallengeItemType | null>(null);

  const [name, setName] = createSignal<string>('');

  const [count, setCount] = createSignal<string>('');

  const [day, handleChangeDay] = createChallengeItemDay();

  const getDisplayType =
    (_step: NewChallengeItemStepType) =>
    (): NewChallengeItemStepDisplayType => {
      const currentStepValue = getStepValue(step());
      const targetStepValue = getStepValue(_step);

      return currentStepValue === targetStepValue
        ? 'current'
        : currentStepValue > targetStepValue
        ? 'end'
        : 'ready';
    };

  return {
    step,
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
