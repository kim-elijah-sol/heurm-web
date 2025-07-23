import { format } from 'date-fns';
import { createSignal } from 'solid-js';
import {
  flowConstant,
  flowQueries,
  type FlowType as FlowTypes,
} from '~/entities/flow';
import { getMidnight } from '~/shared/fx';
import { createInput } from '~/shared/hook';
import type {
  FlowColor,
  FlowIntervalType,
  FlowMonthlyPattern,
  FlowRepeatType,
  FlowType,
  FlowWeeklyPattern,
  FlowYearlyPattern,
  Nullable,
} from '~/shared/types';

export const createNewFlowForm = () => {
  const postFlow = flowQueries.postFlowMutation();

  const [name, handleInputName] = createInput();

  const nameTitle = () =>
    name().trim().length > 0 ? name().trim() : 'New Flow';

  const [color, setColor] = createSignal<FlowColor>('red');

  const [type, setType] = createSignal<FlowType>('COMPLETE');

  const typeStep = () =>
    type() === 'COMPLETE' ? 0 : type() === 'OVER' ? 1 : 2;

  const [targetCount, handleInputTargetCount] = createInput();

  const [unit, handleInputUnit] = createInput();

  const [intervalType, setIntervalType] =
    createSignal<FlowIntervalType>('DAILY');

  const intervalTypeStep = () =>
    flowConstant.INTERVAL_TYPES.indexOf(intervalType());

  const [repeatType, setRepeatType] = createSignal<FlowRepeatType>('EVERY');

  const repeatTypeStep = () => flowConstant.REPEAT_TYPES.indexOf(repeatType());

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

  const accumulateTypeStep = () =>
    flowConstant.INTERVAL_TYPES.indexOf(accumulateType());

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
    const request: FlowTypes.PostFlowRequest = {
      color: color(),
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

    const result = await postFlow.mutateAsync(request);

    return result;
  };

  return {
    name,
    handleInputName,
    nameTitle,
    color,
    setColor,
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
