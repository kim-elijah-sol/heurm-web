import { type Accessor } from 'solid-js';
import { type MainType } from '~/entities/main';

export const filterYearHistory =
  (current: Accessor<Date>) => (it: MainType.GetHistoryResponseItem) => {
    const currentYear = new Date(current()).getFullYear();

    const itYear = new Date(it.date).getFullYear();

    return itYear === currentYear;
  };
