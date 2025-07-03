import clsx from 'clsx';
import {
  createSignal,
  For,
  type Accessor,
  type Component,
  type Setter,
} from 'solid-js';
import {
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
} from '~/shared/constant';
import { getRange } from '~/shared/fx';
import type { FlowColor } from '~/shared/types';
import { BottomSheet, X } from '~/shared/ui';

type Props = {
  close: () => void;
  color: Accessor<FlowColor>;
  onSubmit: (dates: number[]) => void;
  defaultDates: Accessor<number[]>;
};

export const NewChallengeItemDateSelectSheet: Component<Props> = (props) => {
  const [dates, setDates] = createSignal<number[]>(props.defaultDates());

  const disabled = () => dates().length === 0;

  return (
    <BottomSheet close={props.close}>
      {(close) => (
        <>
          <div class='flex justify-between items-center mb-6'>
            <p class='font-semibold text-xl'>Select Specific Date</p>
            <button
              onClick={close}
              class='p-[7px] rounded-[42%] transition-all active:scale-[.95] bg-red-400 active:bg-red-500'
            >
              <X size={24} />
            </button>
          </div>

          <div class='flex flex-col items-center gap-3'>
            <div class='flex justify-start gap-2'>
              <For each={getRange(7, 1)}>
                {(date) => (
                  <DateButton dates={dates} setDates={setDates} date={date} />
                )}
              </For>
            </div>
            <div class='flex justify-start gap-2'>
              <For each={getRange(7, 8)}>
                {(date) => (
                  <DateButton dates={dates} setDates={setDates} date={date} />
                )}
              </For>
            </div>
            <div class='flex justify-start gap-2'>
              <For each={getRange(7, 15)}>
                {(date) => (
                  <DateButton dates={dates} setDates={setDates} date={date} />
                )}
              </For>
            </div>
            <div class='flex justify-start gap-2'>
              <For each={getRange(7, 22)}>
                {(date) => (
                  <DateButton dates={dates} setDates={setDates} date={date} />
                )}
              </For>
            </div>
            <div class='flex justify-start gap-2 w-[328px]'>
              <For each={getRange(4, 29)}>
                {(date) => (
                  <DateButton dates={dates} setDates={setDates} date={date} />
                )}
              </For>
            </div>
          </div>

          <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white my-4' />

          <button
            disabled={disabled()}
            class={clsx(
              'w-full text-white font-semibold h-12 rounded-[20px] transition-all active:scale-95 disabled:active:scale-100 disabled:bg-gray-300 disabled:active:bg-gray-300',
              CHALLENGE_400_BG_COLOR[props.color()],
              CHALLENGE_ACTIVE_BG_500_COLOR[props.color()]
            )}
            onClick={() => {
              close();

              props.onSubmit([...dates()].sort((a, b) => a - b));
            }}
          >
            Select
          </button>
        </>
      )}
    </BottomSheet>
  );
};

type DateButtonProps = {
  date: number;
  dates: Accessor<number[]>;
  setDates: Setter<number[]>;
};

const DateButton: Component<DateButtonProps> = (props) => {
  const setDates = props.setDates;

  const dates = () => props.dates();

  const date = props.date;

  const dateClassName =
    'w-10 h-10 text-[1.25rem] transition-all active:scale-90 rounded-[17px] shadow-sm active:shadow-md border border-gray-100';

  const activeDateClassName = 'font-black day-selected text-gray-700';

  const inactiveDateClassName = 'text-gray-300 font-bold';

  return (
    <button
      onClick={() => {
        setDates(
          dates().includes(date)
            ? dates().filter((it) => it !== date)
            : dates().concat(date)
        );
      }}
      class={clsx(
        dateClassName,
        dates().includes(date) ? activeDateClassName : inactiveDateClassName,
        date === 32 ? '!w-max px-2' : ''
      )}
    >
      {date === 32 ? 'Last Date' : date}
    </button>
  );
};
