import clsx from 'clsx';
import { For, type Accessor, type Component } from 'solid-js';
import { CHALLENGE_DAY } from '~/shared/constant';
import type { ChallengeDay, RollingDisplayType } from '~/shared/types';
import { ArrowLeft, Check } from '~/shared/ui';
import './day-step.ui.css';

type Props = {
  day: Accessor<ChallengeDay[]>;
  onChangeDay: (day: ChallengeDay) => void;
  displayType: Accessor<RollingDisplayType>;
  onNext: () => void;
  onPrev: () => void;
};

export const DayStep: Component<Props> = (props) => {
  const buttonBaseClassName = 'p-5 rounded-[42%] transition-all';

  const dayClassName =
    'w-12 h-12 text-2xl bg-gray-100/25 transition-all active:scale-90 rounded-[42%] shadow-sm active:shadow-md border border-white/0';

  const activeDayClassName = 'font-black day-selected';

  const weekdayActiveClassName = 'text-gray-700';

  const weekdayInactiveClassName = 'text-gray-400';

  const inactiveDayClassName = 'font-semibold';

  const disabled = () => props.day().length === 0;

  return (
    <div
      class={clsx(
        'wys-new-challenge-item-step flex flex-col items-center gap-8',
        `wys-new-challenge-item-step-${props.displayType()}`
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
                  props.day().includes(it)
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
                  props.day().includes(it)
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

      <div class='flex gap-10'>
        <button
          class={clsx(
            buttonBaseClassName,
            'bg-gray-400 active:bg-gray-500 active:scale-90'
          )}
          onClick={props.onPrev}
        >
          <ArrowLeft size={40} />
        </button>

        <button
          class={clsx(
            buttonBaseClassName,
            disabled()
              ? 'bg-gray-300'
              : 'bg-green-400 active:bg-green-500 active:scale-90'
          )}
          onClick={props.onNext}
        >
          <Check size={40} />
        </button>
      </div>
    </div>
  );
};
