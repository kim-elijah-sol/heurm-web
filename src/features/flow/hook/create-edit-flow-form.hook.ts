import { format } from 'date-fns';
import { createSignal, type Accessor } from 'solid-js';
import {
  flowConstant,
  flowQueries,
  FlowType as FlowTypes,
} from '~/entities/flow';
import { getMidnight } from '~/shared/fx';
import { createInput } from '~/shared/hook';
import type {
  FlowAccumulateType,
  FlowColor,
  FlowIntervalType,
  FlowMonthlyPattern,
  FlowRepeatType,
  FlowType,
  FlowWeeklyPattern,
  FlowYearlyPattern,
  Nullable,
} from '~/shared/types';

export const createEditFlowForm = (
  flow: Accessor<FlowTypes.GetFlowResponseItem>
) => {
  const patchFlow = flowQueries.patchFlowMutation();

  const [name, handleInputName] = createInput(flow().name);

  const nameTitle = () =>
    name().trim().length > 0 ? name().trim() : `Edit ${flow().name}`;

  const [color, setColor] = createSignal<FlowColor>(flow().color as FlowColor);

  const [type, setType] = createSignal<FlowType>(flow().type);

  const typeStep = () =>
    type() === 'COMPLETE' ? 0 : type() === 'OVER' ? 1 : 2;

  const [targetCount, handleInputTargetCount] = createInput(
    flow().targetCount?.toString() ?? ''
  );

  const [unit, handleInputUnit] = createInput(flow().unit ?? '');

  const [intervalType, setIntervalType] = createSignal<FlowIntervalType>(
    flow().intervalType
  );

  const intervalTypeStep = () =>
    flowConstant.INTERVAL_TYPES.indexOf(intervalType());

  const [repeatType, setRepeatType] = createSignal<FlowRepeatType>(
    flow().repeatType
  );

  const repeatTypeStep = () => flowConstant.REPEAT_TYPES.indexOf(repeatType());

  const [repeat, setRepeat] = createSignal<string>(
    flow().repeat?.toString() ?? ''
  );

  const [rest, setRest] = createSignal<string>(flow().rest?.toString() ?? '');

  const [weeklyPattern, setWeeklyPattern] = createSignal<FlowWeeklyPattern>(
    flow().days.length ? 'Select Day' : 'Every Day'
  );

  const [days, setDays] = createSignal<number[]>(flow().days);

  const [monthlyPattern, setMonthlyPattern] = createSignal<FlowMonthlyPattern>(
    flow().weeks.length
      ? 'Select Week'
      : flow().dates.length
      ? 'Select Date'
      : 'Every Week'
  );

  const [dates, setDates] = createSignal<number[]>(flow().dates);

  const [weeks, setWeeks] = createSignal<number[]>(flow().weeks);

  const [yearlyPattern, setYearlyPattern] = createSignal<FlowYearlyPattern>(
    flow().months.length ? 'Select Month' : 'Every Month'
  );

  const [months, setMonths] = createSignal<number[]>(flow().months);

  const [accumulate, setAccumulate] = createSignal<boolean>(
    flow().accumulateType !== null
  );

  const [accumulateType, setAccumulateType] = createSignal<FlowAccumulateType>(
    flow().accumulateType ?? 'WEEKLY'
  );

  const accumulateTypeStep = () =>
    flowConstant.ACCUMULATE_TYPES.indexOf(accumulateType());

  const [startAt, setStartAt] = createSignal<Nullable<Date>>(
    getMidnight(flow().startAt)
  );

  const [endAt, setEndAt] = createSignal<Nullable<Date>>(
    flow().endAt ? getMidnight(flow().endAt!) : null
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
    const request: FlowTypes.PatchFlowRequest = {
      flowId: flow().id,
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

    await patchFlow.mutateAsync(request);
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
