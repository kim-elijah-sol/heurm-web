import { useQueryClient } from '@tanstack/solid-query';
import { format } from 'date-fns';
import { createEffect, createSignal, type Accessor } from 'solid-js';
import {
  challengeEditQueries,
  type ChallengeEditType,
} from '~/entities/challenge-edit';
import { newChallengeItemConstant } from '~/entities/new-challenge-item';
import { getMidnight } from '~/features/main/fx';
import { createInput } from '~/shared/hook';
import type {
  ChallengeItemType,
  FlowIntervalType,
  FlowMonthlyPattern,
  FlowRepeatType,
  FlowWeeklyPattern,
  FlowYearlyPattern,
  Nullable,
} from '~/shared/types';

export const createNewChallengeItemForm = (challengeId: Accessor<string>) => {
  const queryClient = useQueryClient();

  const postChallengeItem = challengeEditQueries.postChallengeItemMutation();

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
    createSignal<FlowIntervalType>('DAILY');

  const intervalTypeStep = () =>
    newChallengeItemConstant.INTERVAL_TYPES.indexOf(intervalType());

  const [repeatType, setRepeatType] = createSignal<FlowRepeatType>('EVERY');

  const repeatTypeStep = () =>
    newChallengeItemConstant.REPEAT_TYPES.indexOf(repeatType());

  const [repeat, setRepeat] = createSignal<string>('');

  const [rest, setRest] = createSignal<string>('');

  const [weeklyPattern, setWeeklyPattern] =
    createSignal<FlowWeeklyPattern>('Every Day');

  const [days, setDays] = createSignal<number[]>([]);

  const [monthlyPattern, setMonthlyPattern] =
    createSignal<FlowMonthlyPattern>('Every Week');

  const [dates, setDates] = createSignal<number[]>([]);

  const [weeks, setWeeks] = createSignal<number[]>([]);

  const [yearlyPattern, setYearlyPattern] =
    createSignal<FlowYearlyPattern>('Every Month');

  const [months, setMonths] = createSignal<number[]>([]);

  const [accumulate, setAccumulate] = createSignal<boolean>(false);

  const [accumulateType, setAccumulateType] =
    createSignal<FlowIntervalType>('DAILY');

  const accumulateTypes = (): FlowIntervalType[] => {
    const result: FlowIntervalType[] = ['DAILY'];

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

  const getRepeatRadioText = (repeatType: FlowRepeatType) => {
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

  const disabled = () => {
    if (name().trim().length === 0) return true;
    if (type() !== 'COMPLETE' && targetCount().trim().length === 0) return true;
    if (repeatType() === 'N' && repeat().trim().length === 0) return true;
    if (
      repeatType() === 'NM' &&
      (repeat().trim().length === 0 || rest().trim().length === 0)
    )
      return true;

    return false;
  };

  const handleSave = async () => {
    const request: ChallengeEditType.PostChallengeItemRequest = {
      challengeId: challengeId(),
      name: name(),
      type: type(),
      intervalType: intervalType(),
      repeatType: repeatType(),
      startAt: format(startAt()!, 'yyyy-MM-dd'),
    };

    if (type() !== 'COMPLETE') {
      request.targetCount = Number(targetCount());
      request.unit = unit();

      if (accumulate()) {
        request.accumulateType = accumulateType();
      }
    }

    if (repeatType() !== 'EVERY') {
      request.repeat = Number(repeat());

      if (repeatType() === 'NM') {
        request.rest = Number(rest());
      }
    }

    const putWeeklyPatternData = () => {
      if (weeklyPattern() === 'Select Day') {
        request.days = days();
      }
    };

    const putMonthlyPatternData = () => {
      if (monthlyPattern() === 'Select Date') {
        request.dates = dates();
      } else if (monthlyPattern() === 'Select Week') {
        request.weeks = weeks();
      }
    };

    const putYearlyPatternData = () => {
      if (yearlyPattern() === 'Select Month') {
        request.months = months();
      }
    };

    if (intervalType() === 'WEEKLY') {
      putWeeklyPatternData();
    } else if (intervalType() === 'MONTHLY') {
      putMonthlyPatternData();
      if (monthlyPattern() !== 'Select Date') {
        putWeeklyPatternData();
      }
    } else if (intervalType() === 'YEARLY') {
      putYearlyPatternData();
      putMonthlyPatternData();
      if (monthlyPattern() !== 'Select Date') {
        putWeeklyPatternData();
      }
    }

    if (endAt()) {
      request.endAt = format(endAt()!, 'yyyy-MM-dd');
    }

    await postChallengeItem.mutateAsync(request);

    queryClient.invalidateQueries({
      queryKey: ['getChallengeItem', challengeId()],
    });
  };

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
    nRadioText,
    getRepeatRadioText,
    restPlaceholderText,
    disabled,
    handleSave,
  };
};
