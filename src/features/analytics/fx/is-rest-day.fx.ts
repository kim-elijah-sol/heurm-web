import { getWeekOfMonth, lastDayOfMonth } from 'date-fns';
import { type FlowType } from '~/entities/flow';
import { ONE_DAY } from '~/shared/constant';
import { getMidnight } from '~/shared/fx';

type RequiredFlowItemProperty =
  | 'repeat'
  | 'rest'
  | 'intervalType'
  | 'months'
  | 'weeks'
  | 'dates'
  | 'days'
  | 'startAt';

type IsRestDay = (
  current: number
) => (
  flow: Pick<FlowType.GetFlowResponseItem, RequiredFlowItemProperty>
) => boolean;

export const isRestDay: IsRestDay = (current) => (flow) => {
  const startAt = getMidnight(flow.startAt).valueOf();

  if (flow.intervalType === 'DAILY') {
    if (flow.repeat && flow.rest) {
      const repeatTerm = ONE_DAY * flow.repeat;

      const restTerm = ONE_DAY * flow.rest;

      const totalTerm = repeatTerm + restTerm;

      if ((current - startAt) % totalTerm >= repeatTerm) return true;
    } else if (flow.repeat) {
      const repeatTerm = ONE_DAY * flow.repeat;

      if ((current - startAt) % repeatTerm !== 0) return true;
    }
  } else if (flow.intervalType === 'WEEKLY') {
    const startAtDay = new Date(startAt).getDay();
    const startWeekFirstDate = new Date(
      startAt - startAtDay * ONE_DAY
    ).valueOf();

    const currentDay = new Date(current).getDay();
    const thisWeekFirstDate = new Date(
      current - currentDay * ONE_DAY
    ).valueOf();

    const ONE_WEEK = ONE_DAY * 7;

    const repeatTerm = ONE_WEEK * (flow.repeat ?? 0);

    if (flow.repeat && flow.rest) {
      const restTerm = ONE_WEEK * flow.rest;

      const totalTerm = repeatTerm + restTerm;

      if ((thisWeekFirstDate - startWeekFirstDate) % totalTerm >= repeatTerm)
        return true;
    } else if (flow.repeat) {
      if ((thisWeekFirstDate - startWeekFirstDate) % repeatTerm !== 0)
        return true;
    }
  } else if (flow.intervalType === 'MONTHLY') {
    const startYear = new Date(startAt).getFullYear();

    const currentYear = new Date(current).getFullYear();

    const startMonth = new Date(startAt).getMonth() + 1;

    const currentMonth = new Date(current).getMonth() + 1;

    if (flow.repeat && flow.rest) {
      const totalMonths =
        (currentYear - startYear) * 12 + (currentMonth - startMonth);

      const cycleLength = flow.repeat + flow.rest;

      const positionInCycle = totalMonths % cycleLength;

      if (positionInCycle >= flow.repeat) return true;
    } else if (flow.repeat) {
      const diffMonths =
        (startYear - currentYear) * 12 + (startMonth - currentMonth);

      if (diffMonths % flow.repeat !== 0) return true;
    }
  } else if (flow.intervalType === 'YEARLY') {
    if (flow.repeat && flow.rest) {
      const currentYear = new Date(current).getFullYear();
      const startYear = new Date(startAt).getFullYear();

      const totalTerm = flow.repeat + flow.rest;

      if ((currentYear - startYear) % totalTerm >= flow.repeat) return true;
    } else if (flow.repeat) {
      if (
        (new Date(current).getFullYear() - new Date(startAt).getFullYear()) %
          flow.repeat !==
        0
      )
        return true;
    }
  }

  if (flow.months.length > 0) {
    const currentMonth = new Date(current).getMonth();
    if (flow.months.includes(currentMonth) === false) {
      return true;
    }
  }

  if (flow.dates.length > 0) {
    const currentMonth = new Date(current).getMonth() + 1;

    const currentDate = new Date(current).getDate();

    const isLastDate =
      new Date(current + ONE_DAY).getMonth() + 1 !== currentMonth;

    const findDates = [currentDate];

    if (isLastDate) findDates.push(32);

    if (flow.dates.every((date) => findDates.includes(date) === false)) {
      return true;
    }
  } else if (flow.weeks.length > 0) {
    const currentWeek = getWeekOfMonth(current);
    const lastDate = lastDayOfMonth(current);
    const lastWeekOfMonth = getWeekOfMonth(lastDate);
    const isLastWeek = currentWeek === lastWeekOfMonth;

    const findWeeks = [currentWeek];

    if (isLastWeek) findWeeks.push(6);

    if (flow.weeks.every((date) => findWeeks.includes(date) === false)) {
      return true;
    }
  }

  if (flow.days.length > 0) {
    const currentDay = new Date(current).getDay();
    if (flow.days.includes(currentDay) === false) {
      return true;
    }
  }

  return false;
};
