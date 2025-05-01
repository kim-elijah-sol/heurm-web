import { createSignal } from 'solid-js';
import { CHALLENGE_DAY } from '~/entities/main';

type Day = (typeof CHALLENGE_DAY)[number];

export const createChallengeItemDay = (defaulyDay?: Day[]) => {
  const [day, setDay] = createSignal<Day[]>(defaulyDay ?? []);

  const handleChangeDay = (selectDay: Day) => {
    setDay((day) =>
      day.includes(selectDay)
        ? day.filter((day) => day !== selectDay)
        : day.concat(selectDay)
    );
  };

  return [day, handleChangeDay] as const;
};
