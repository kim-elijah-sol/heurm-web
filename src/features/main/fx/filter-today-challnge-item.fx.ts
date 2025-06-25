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
    }

    return true;
  };
