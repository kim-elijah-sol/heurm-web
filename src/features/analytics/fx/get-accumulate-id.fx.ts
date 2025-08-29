import { format } from 'date-fns';
import { ONE_DAY } from '~/shared/constant';
import { dateFormat } from '~/shared/fx';

export const getAccumulateId = {
  weekly: (current: number) => {
    const currentDate = new Date(current);

    const currentDay = currentDate.getDay();

    const weekFirstDate = new Date(current - currentDay * ONE_DAY);

    return dateFormat['yyyy-MM-dd'](weekFirstDate);
  },
  monthly: (current: number) => {
    return format(current, 'yyyy-MM');
  },
};
