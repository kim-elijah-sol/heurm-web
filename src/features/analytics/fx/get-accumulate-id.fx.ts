import { dateFormat } from '~/shared/fx';

const ONE_DAY = 86_400_000;

export const getAccumulateId = {
  weekly: (current: number) => {
    const currentDate = new Date(current);

    const currentDay = currentDate.getDay();

    const weekFirstDate = new Date(current - currentDay * ONE_DAY);

    return dateFormat['yyyy-MM-dd'](weekFirstDate);
  },
};
