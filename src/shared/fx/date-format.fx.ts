import { format } from 'date-fns';

export const dateFormat = {
  ['yyyy-MM-dd']: (date: string | number | Date) => format(date, 'yyyy-MM-dd'),
  ['yyyy.MM.dd']: (date: string | number | Date) => format(date, 'yyyy.MM.dd'),
};
