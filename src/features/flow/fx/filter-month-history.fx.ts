import { type Accessor } from 'solid-js';
import { type HistoryType } from '~/entities/history';

export const filterMonthHistory =
  (current: Accessor<Date>) => (it: HistoryType.GetHistoryResponseItem) => {
    const currentYear = new Date(current()).getFullYear();
    const currentMonth = new Date(current()).getMonth();

    const itYear = new Date(it.date).getFullYear();
    const itMonth = new Date(it.date).getMonth();

    return itYear === currentYear && itMonth === currentMonth;
  };
