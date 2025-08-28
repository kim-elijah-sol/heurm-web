import { type Accessor } from 'solid-js';
import { type HistoryType } from '~/entities/history';
import { ONE_DAY } from '~/shared/constant';
import { dateFormat } from '~/shared/fx';

const getDateValue = (date: number | string | Date) => {
  return Number(dateFormat['yyyy-MM-dd'](date).replace(/-/g, ''));
};

export const filterWeekHistory =
  (current: Accessor<Date>) => (it: HistoryType.GetHistoryResponseItem) => {
    const currentDay = new Date(current()).getDay();
    const weekFirstDate = new Date(
      current().valueOf() - currentDay * ONE_DAY
    ).valueOf();

    const weekLastDate = new Date(weekFirstDate + ONE_DAY * 6).valueOf();

    return (
      getDateValue(it.date) >= getDateValue(weekFirstDate) &&
      getDateValue(it.date) <= getDateValue(weekLastDate)
    );
  };
