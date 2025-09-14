import { type Accessor } from 'solid-js';
import { type HistoryType } from '~/entities/history';
import { dateFormat } from '~/shared/fx';

export const findCurrentHistory =
  (current: Accessor<Date>) =>
  (it: Pick<HistoryType.GetHistoryResponseItem, 'date'>) =>
    dateFormat['yyyy-MM-dd'](it.date) === dateFormat['yyyy-MM-dd'](current());
