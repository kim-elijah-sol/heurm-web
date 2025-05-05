import clsx from 'clsx';
import { For } from 'solid-js';
import { CHALLENGE_DAY, NewChallengeStepDisplayType } from '~/entities/main';
import { ArrowLeft, Check } from '~/shared/ui';

type Day = (typeof CHALLENGE_DAY)[number];

type Props = {
  day: Day[];
  onChangeDay: (day: Day) => void;
  displayType: NewChallengeStepDisplayType;
  onNext: () => void;
  onPrev: () => void;
};

export const DayStep = (props: Props) => {
  const buttonBaseClassName =
    'p-6 rounded-[35%] transition-all active:scale-90';

  const dayClassName =
    'w-12 h-12 text-2xl bg-gray-50/25 transition-all active:scale-90 rounded-[35%] shadow-sm active:shadow-md';

  const activeDayClassName = 'font-black bg-gray-100';

  const weekdayActiveClassName = 'text-gray-700';

  const weekdayInactiveClassName = 'text-gray-400';

  const inactiveDayClassName = 'font-semibold';

  return (
    <div
      class={clsx(
        'wys-challenge-slide-panel-new-item-step flex flex-col items-center gap-8',
        `wys-challenge-slide-panel-new-item-step-${props.displayType}`
      )}
    >
      <div class='flex flex-col gap-4 w-full items-center'>
        <div class='flex gap-4'>
          <For each={CHALLENGE_DAY.slice(0, 4)}>
            {(it) => (
              <button
                onClick={() => props.onChangeDay(it)}
                class={clsx(
                  dayClassName,
                  props.day.includes(it)
                    ? clsx(
                        activeDayClassName,
                        it === 'SUN' ? 'text-red-500' : weekdayActiveClassName
                      )
                    : clsx(
                        inactiveDayClassName,
                        it === 'SUN' ? 'text-red-300' : weekdayInactiveClassName
                      )
                )}
              >
                {it[0]}
              </button>
            )}
          </For>
        </div>

        <div class='flex gap-4'>
          <For each={CHALLENGE_DAY.slice(4)}>
            {(it) => (
              <button
                onClick={() => props.onChangeDay(it)}
                class={clsx(
                  dayClassName,
                  props.day.includes(it)
                    ? clsx(
                        activeDayClassName,
                        it === 'SAT' ? 'text-blue-500' : weekdayActiveClassName
                      )
                    : clsx(
                        inactiveDayClassName,
                        it === 'SAT'
                          ? 'text-blue-300'
                          : weekdayInactiveClassName
                      )
                )}
              >
                {it[0]}
              </button>
            )}
          </For>
        </div>
      </div>

      <div class='flex gap-12'>
        <button
          class={clsx(buttonBaseClassName, 'bg-gray-400 active:bg-gray-500')}
          onClick={props.onPrev}
        >
          <ArrowLeft />
        </button>

        <button
          class={clsx(buttonBaseClassName, 'bg-green-400 active:bg-green-500')}
          onClick={props.onNext}
        >
          <Check />
        </button>
      </div>
    </div>
  );
};
