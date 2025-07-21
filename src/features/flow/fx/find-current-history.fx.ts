import { format } from 'date-fns';
import { HistoryType } from '~/entities/history';

export const findCurrentHistory =
  (current: Date) => (it: HistoryType.GetHistoryResponseItem) =>
    format(it.date, 'yyyy.MM.dd') === format(current, 'yyyy.MM.dd');
