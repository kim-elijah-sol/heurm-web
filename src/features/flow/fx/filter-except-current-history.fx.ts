import { type Accessor } from 'solid-js';
import { type HistoryType } from '~/entities/history';
import { dateFormat } from '~/shared/fx';

export const filterExceptCurrentHistory =
  (current: Accessor<Date>) => (it: HistoryType.GetHistoryResponseItem) =>
    dateFormat['yyyy-MM-dd'](it.date) !== dateFormat['yyyy-MM-dd'](current());
