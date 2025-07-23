import { type Accessor } from 'solid-js';
import { type HistoryType } from '~/entities/history';

export const filterYearHistory =
  (current: Accessor<Date>) => (it: HistoryType.GetHistoryResponseItem) => {
    const currentYear = new Date(current()).getFullYear();

    const itYear = new Date(it.date).getFullYear();

    return itYear === currentYear;
  };
