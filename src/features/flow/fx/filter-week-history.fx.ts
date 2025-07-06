import { type Accessor } from 'solid-js';
import { type MainType } from '~/entities/main';
import { dateFormat } from '~/shared/fx';

const getDateValue = (date: number | string | Date) => {
  return Number(dateFormat['yyyy-MM-dd'](date).replace(/-/g, ''));
};

export const filterWeekHistory =
  (current: Accessor<Date>) => (it: MainType.GetHistoryResponseItem) => {
    const ONE_DAY = 86_400_000;

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
