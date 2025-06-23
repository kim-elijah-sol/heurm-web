import { createEffect, createSignal } from 'solid-js';
import { newChallengeItemConstant } from '~/entities/new-challenge-item';
import { getMidnight } from '~/features/main/fx';
import { createInput } from '~/shared/hook';
import type {
  ChallengeItemIntervalType,
  ChallengeItemMonthlyPattern,
  ChallengeItemRepeatType,
  ChallengeItemType,
  ChallengeItemWeeklyPattern,
  ChallengeItemYearlyPattern,
  Nullable,
} from '~/shared/types';

export const createNewChallengeItemForm = () => {
  const [name, handleInputName] = createInput();

  const nameTitle = () =>
    name().trim().length > 0 ? name().trim() : 'New Challenge Item';

  const [type, setType] =
    createSignal<Uppercase<ChallengeItemType>>('COMPLETE');

  const typeStep = () =>
    type() === 'COMPLETE' ? 0 : type() === 'OVER' ? 1 : 2;

  const [targetCount, handleInputTargetCount] = createInput();

  const [unit, handleInputUnit] = createInput();

  const [intervalType, setIntervalType] =
    createSignal<ChallengeItemIntervalType>('DAILY');

  const intervalTypeStep = () =>
    newChallengeItemConstant.INTERVAL_TYPES.indexOf(intervalType());

  const [repeatType, setRepeatType] =
    createSignal<ChallengeItemRepeatType>('EVERY');

  const repeatTypeStep = () =>
    newChallengeItemConstant.REPEAT_TYPES.indexOf(repeatType());

  const [repeat, setRepeat] = createSignal<string>('');

  const [rest, setRest] = createSignal<string>('');

  const [weeklyPattern, setWeeklyPattern] =
    createSignal<ChallengeItemWeeklyPattern>('Every Day');

  const [days, setDays] = createSignal<number[]>([]);

  const [monthlyPattern, setMonthlyPattern] =
    createSignal<ChallengeItemMonthlyPattern>('Every Week');

  const [dates, setDates] = createSignal<number[]>([]);

  const [weeks, setWeeks] = createSignal<number[]>([]);

  const [yearlyPattern, setYearlyPattern] =
    createSignal<ChallengeItemYearlyPattern>('Every Month');

  const [months, setMonths] = createSignal<number[]>([]);

  const [accumulate, setAccumulate] = createSignal<boolean>(false);

  const [accumulateType, setAccumulateType] =
    createSignal<ChallengeItemIntervalType>('DAILY');

  const accumulateTypes = (): ChallengeItemIntervalType[] => {
    const result: ChallengeItemIntervalType[] = ['DAILY'];

    const step = newChallengeItemConstant.INTERVAL_TYPES.indexOf(
      intervalType()
    );

    if (step >= 1) result.push('WEEKLY');
    if (step >= 2) result.push('MONTHLY');
    if (step >= 3) result.push('YEARLY');

    return result;
  };

  const accumulateTypeStep = () => accumulateTypes().indexOf(accumulateType());

  const [startAt, setStartAt] = createSignal<Nullable<Date>>(getMidnight());

  const [endAt, setEndAt] = createSignal<Nullable<Date>>(null);

  const repeatUnit = () =>
    ((
      {
        DAILY: 'Day',
        WEEKLY: 'Week',
        MONTHLY: 'Month',
        YEARLY: 'Year',
      } as const
    )[intervalType()]);

  const everyRadioText = () => `Every ${repeatUnit()}`;

  const nRadioText = () => `Every N ${repeatUnit()}`;

  const getRepeatRadioText = (repeatType: ChallengeItemRepeatType) => {
    return repeatType === 'EVERY'
      ? everyRadioText()
      : repeatType === 'N'
      ? nRadioText()
      : 'N on, M off';
  };

  const restPlaceholderText = () => `M ${repeatUnit()}`;

  createEffect(() => {
    if (accumulateTypeStep() === -1) {
      setAccumulateType(
        newChallengeItemConstant.INTERVAL_TYPES[accumulateTypes().length - 1]
      );
    }
  });

  return {
    name,
    handleInputName,
    nameTitle,
    type,
    setType,
    typeStep,
    targetCount,
    handleInputTargetCount,
    unit,
    handleInputUnit,
    intervalType,
    setIntervalType,
    intervalTypeStep,
    repeatType,
    setRepeatType,
    repeatTypeStep,
    repeat,
    setRepeat,
    rest,
    setRest,
    weeklyPattern,
    setWeeklyPattern,
    days,
    setDays,
    monthlyPattern,
    setMonthlyPattern,
    dates,
    setDates,
    weeks,
    setWeeks,
    yearlyPattern,
    setYearlyPattern,
    months,
    setMonths,
    accumulate,
    setAccumulate,
    accumulateType,
    setAccumulateType,
    accumulateTypes,
    accumulateTypeStep,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    repeatUnit,
    everyRadioText,
    nRadioText,
    getRepeatRadioText,
    restPlaceholderText,
  };
};
