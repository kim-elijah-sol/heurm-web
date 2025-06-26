import { getWeekOfMonth, lastDayOfMonth } from 'date-fns';
import { type ChallengeEditType } from '~/entities/challenge-edit';
import { getMidnight } from './get-midnight.fx';

const ONE_DAY = 86_400_000;

export const filterTodayChallengeItem =
  (today: number) =>
  (it: ChallengeEditType.GetChallengeItemResponseItem): boolean => {
    const startAt = getMidnight(it.startAt).valueOf();

    if (today < startAt) return false;
    if (it.endAt && today > getMidnight(it.endAt).valueOf()) return false;

    if (it.intervalType === 'DAILY') {
      if (it.repeat && it.rest) {
        const repeatTerm = ONE_DAY * it.repeat;

        const restTerm = ONE_DAY * it.rest;

        const totalTerm = repeatTerm + restTerm;

        if ((today - startAt) % totalTerm >= repeatTerm) return false;
      } else if (it.repeat) {
        const repeatTerm = ONE_DAY * it.repeat;

        if ((today - startAt) % repeatTerm !== 0) return false;
      }
    } else if (it.intervalType === 'WEEKLY') {
      const startAtDay = new Date(startAt).getDay();
      const startWeekFirstDate = new Date(
        startAt - startAtDay * ONE_DAY
      ).valueOf();

      const todayDay = new Date(today).getDay();
      const thisWeekFirstDate = new Date(today - todayDay * ONE_DAY).valueOf();

      const ONE_WEEK = ONE_DAY * 7;

      const repeatTerm = ONE_WEEK * (it.repeat ?? 0);

      if (it.repeat && it.rest) {
        const restTerm = ONE_WEEK * it.rest;

        const totalTerm = repeatTerm + restTerm;

        if ((thisWeekFirstDate - startWeekFirstDate) % totalTerm >= repeatTerm)
          return false;
      } else if (it.repeat) {
        if ((thisWeekFirstDate - startWeekFirstDate) % repeatTerm !== 0)
          return false;
      }

      if (it.days.length > 0) {
        if (it.days.includes(todayDay) === false) {
          return false;
        }
      }
    } else if (it.intervalType === 'MONTHLY') {
      const startYear = new Date(startAt).getFullYear();

      const todayYear = new Date(today).getFullYear();

      const startMonth = new Date(startAt).getMonth() + 1;

      const todayMonth = new Date(today).getMonth() + 1;

      if (it.repeat && it.rest) {
        const totalMonths =
          (todayYear - startYear) * 12 + (todayMonth - startMonth);

        const cycleLength = it.repeat + it.rest;

        const positionInCycle = totalMonths % cycleLength;

        if (positionInCycle >= it.repeat) return false;
      } else if (it.repeat) {
        const diffMonths =
          (startYear - todayYear) * 12 + (startMonth - todayMonth);

        if (diffMonths % it.repeat !== 0) return false;
      }

      if (it.dates.length > 0) {
        const todayDate = new Date(today).getDate();

        const isLastDate =
          new Date(today + ONE_DAY).getMonth() + 1 !== todayMonth;

        const findDates = [todayDate];

        if (isLastDate) findDates.push(32);

        if (it.dates.every((date) => findDates.includes(date) === false)) {
          return false;
        }
      } else if (it.weeks.length > 0) {
        const todayWeek = getWeekOfMonth(today);
        const lastDate = lastDayOfMonth(today);
        const lastWeekOfMonth = getWeekOfMonth(lastDate);
        const isLastWeek = todayWeek === lastWeekOfMonth;

        const findWeeks = [todayWeek];

        if (isLastWeek) findWeeks.push(6);

        if (it.weeks.every((date) => findWeeks.includes(date) === false)) {
          return false;
        }
      }

      if (it.days.length > 0) {
        const todayDay = new Date(today).getDay();
        if (it.days.includes(todayDay) === false) {
          return false;
        }
      }
    }

    return true;
  };
