import clsx from 'clsx';
import { createSignal, type Accessor, type Component } from 'solid-js';
import {
  FLOW_ACTIVE_BG_500,
  FLOW_ACTIVE_BORDER_500,
  FLOW_ACTIVE_TEXT_500,
  FLOW_BG_400,
  FLOW_BORDER_500,
  FLOW_DAY,
  FLOW_TEXT_500,
} from '~/shared/constant';
import { FlowColor } from '~/shared/types';
import { BottomSheet, X } from '~/shared/ui';

type Props = {
  close: () => void;
  color: Accessor<FlowColor>;
  onSubmit: (days: number[]) => void;
  defaultDays: Accessor<number[]>;
};

export const NewChallengeItemDaySelectSheet: Component<Props> = (props) => {
  const [days, setDays] = createSignal<number[]>(props.defaultDays());

  const dayClassName =
    'w-10 h-10 text-[1.25rem] transition-all active:scale-90 rounded-[42%] shadow-sm active:shadow-md border border-gray-100';

  const activeDayClassName = 'font-black day-selected';

  const weekdayActiveClassName = 'text-gray-700';

  const weekdayInactiveClassName = 'text-gray-300';

  const inactiveDayClassName = 'font-bold';

  const utilityButtonClassName = clsx(
    'flex-1 text-center rounded-[18px] h-11 font-semibold transition-all active:scale-95 border-2',
    FLOW_ACTIVE_BORDER_500[props.color()],
    FLOW_ACTIVE_TEXT_500[props.color()]
  );

  const disabled = () => days().length === 0;

  const getUtilityButtonColorClassName = (isActive: boolean) =>
    isActive
      ? clsx(FLOW_BORDER_500[props.color()], FLOW_TEXT_500[props.color()])
      : `border-gray-200 text-gray-300`;
  return (
    <BottomSheet close={props.close}>
      {(close) => (
        <>
          <div class='flex justify-between items-center mb-6'>
            <p class='font-semibold text-xl'>Select Specific Day</p>
            <button
              onClick={close}
              class='p-[7px] rounded-[42%] transition-all active:scale-[.95] bg-red-400 active:bg-red-500'
            >
              <X size={24} />
            </button>
          </div>

          <div class='flex justify-between'>
            {FLOW_DAY.map((day, dayIndex) => (
              <button
                onClick={() => {
                  setDays(
                    days().includes(dayIndex)
                      ? days().filter((it) => it !== dayIndex)
                      : days().concat(dayIndex)
                  );
                }}
                class={clsx(
                  dayClassName,
                  days().includes(dayIndex)
                    ? clsx(
                        activeDayClassName,
                        day === 'SUN'
                          ? 'text-red-500'
                          : day === 'SAT'
                          ? 'text-blue-500'
                          : weekdayActiveClassName
                      )
                    : clsx(
                        inactiveDayClassName,
                        day === 'SUN'
                          ? 'text-red-200'
                          : day === 'SAT'
                          ? 'text-blue-200'
                          : weekdayInactiveClassName
                      )
                )}
              >
                {day[0]}
              </button>
            ))}
          </div>

          <div class='flex gap-3 mt-6'>
            <button
              class={clsx(
                utilityButtonClassName,
                getUtilityButtonColorClassName(
                  days().length === 5 &&
                    days().includes(0) === false &&
                    days().includes(6) === false
                )
              )}
              onClick={() => setDays([1, 2, 3, 4, 5])}
            >
              WEEK-DAY
            </button>
            <button
              class={clsx(
                utilityButtonClassName,
                getUtilityButtonColorClassName(
                  days().length === 2 &&
                    days().includes(0) === true &&
                    days().includes(6) === true
                )
              )}
              onClick={() => setDays([0, 6])}
            >
              WEEK-END
            </button>
          </div>

          <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white my-4' />

          <button
            disabled={disabled()}
            class={clsx(
              'w-full text-white font-semibold h-12 rounded-[20px] transition-all active:scale-95 disabled:active:scale-100 disabled:bg-gray-300 disabled:active:bg-gray-300',
              FLOW_BG_400[props.color()],
              FLOW_ACTIVE_BG_500[props.color()]
            )}
            onClick={() => {
              close();

              props.onSubmit([...days()].sort((a, b) => a - b));
            }}
          >
            Select
          </button>
        </>
      )}
    </BottomSheet>
  );
};
