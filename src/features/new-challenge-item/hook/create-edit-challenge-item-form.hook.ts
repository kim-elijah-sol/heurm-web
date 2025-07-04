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
  ChallengeItemIntervalType,
  ChallengeItemType,
  FlowMonthlyPattern,
  FlowRepeatType,
  FlowWeeklyPattern,
  FlowYearlyPattern,
  Nullable,
} from '~/shared/types';

export const createEditChallengeItemForm = (
  challengeId: Accessor<string>,
  challengeItem: Accessor<ChallengeEditType.GetChallengeItemResponseItem>
) => {
  const queryClient = useQueryClient();

  const patchChallengeItem = challengeEditQueries.patchChallengeItemMutation();

  const [name, handleInputName] = createInput(challengeItem().name);

  const nameTitle = () =>
    name().trim().length > 0 ? name().trim() : `Edit ${challengeItem().name}`;

  const [type, setType] = createSignal<Uppercase<ChallengeItemType>>(
    challengeItem().type
  );

  const typeStep = () =>
    type() === 'COMPLETE' ? 0 : type() === 'OVER' ? 1 : 2;

  const [targetCount, handleInputTargetCount] = createInput(
    challengeItem().targetCount?.toString() ?? ''
  );

  const [unit, handleInputUnit] = createInput(challengeItem().unit ?? '');

  const [intervalType, setIntervalType] =
    createSignal<ChallengeItemIntervalType>(challengeItem().intervalType);

  const intervalTypeStep = () =>
    newChallengeItemConstant.INTERVAL_TYPES.indexOf(intervalType());

  const [repeatType, setRepeatType] = createSignal<FlowRepeatType>(
    challengeItem().repeatType
  );

  const repeatTypeStep = () =>
    newChallengeItemConstant.REPEAT_TYPES.indexOf(repeatType());

  const [repeat, setRepeat] = createSignal<string>(
    challengeItem().repeat?.toString() ?? ''
  );

  const [rest, setRest] = createSignal<string>(
    challengeItem().rest?.toString() ?? ''
  );

  const [weeklyPattern, setWeeklyPattern] = createSignal<FlowWeeklyPattern>(
    challengeItem().days.length ? 'Select Day' : 'Every Day'
  );

  const [days, setDays] = createSignal<number[]>(challengeItem().days);

  const [monthlyPattern, setMonthlyPattern] = createSignal<FlowMonthlyPattern>(
    challengeItem().weeks.length
      ? 'Select Week'
      : challengeItem().dates.length
      ? 'Select Date'
      : 'Every Week'
  );

  const [dates, setDates] = createSignal<number[]>(challengeItem().dates);

  const [weeks, setWeeks] = createSignal<number[]>(challengeItem().weeks);

  const [yearlyPattern, setYearlyPattern] = createSignal<FlowYearlyPattern>(
    challengeItem().months.length ? 'Select Month' : 'Every Month'
  );

  const [months, setMonths] = createSignal<number[]>(challengeItem().months);

  const [accumulate, setAccumulate] = createSignal<boolean>(
    challengeItem().accumulateType !== null
  );

  const [accumulateType, setAccumulateType] =
    createSignal<ChallengeItemIntervalType>(
      challengeItem().accumulateType ?? 'DAILY'
    );

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

  const [startAt, setStartAt] = createSignal<Nullable<Date>>(
    getMidnight(challengeItem().startAt)
  );

  const [endAt, setEndAt] = createSignal<Nullable<Date>>(
    challengeItem().endAt ? getMidnight(challengeItem().endAt!) : null
  );

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
    const request: ChallengeEditType.PatchChallengeItemRequest = {
      challengeId: challengeId(),
      challengeItemId: challengeItem().id,
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
      } else {
        request.accumulateType = null;
      }
    } else {
      request.targetCount = null;
      request.unit = null;
      request.accumulateType = null;
    }

    if (repeatType() !== 'EVERY') {
      request.repeat = Number(repeat());

      if (repeatType() === 'NM') {
        request.rest = Number(rest());
      } else {
        request.rest = null;
      }
    } else {
      request.repeat = null;
      request.rest = null;
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

    request.days = request.days ?? [];
    request.dates = request.dates ?? [];
    request.weeks = request.weeks ?? [];
    request.months = request.months ?? [];

    if (endAt()) {
      request.endAt = format(endAt()!, 'yyyy-MM-dd');
    } else {
      request.endAt = null;
    }

    await patchChallengeItem.mutateAsync(request);

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
