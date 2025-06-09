import { createSignal } from 'solid-js';
import { ChallengeDay } from '~/shared/types';

export const createChallengeItemDay = (defaulyDay?: ChallengeDay[]) => {
  const [day, setDay] = createSignal<ChallengeDay[]>(defaulyDay ?? []);

  const handleChangeDay = (selectDay: ChallengeDay) => {
    setDay((day) =>
      day.includes(selectDay)
        ? day.filter((day) => day !== selectDay)
        : day.concat(selectDay)
    );
  };

  return [day, handleChangeDay] as const;
};
