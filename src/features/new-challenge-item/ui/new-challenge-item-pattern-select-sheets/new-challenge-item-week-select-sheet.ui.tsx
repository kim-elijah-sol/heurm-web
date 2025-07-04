import clsx from 'clsx';
import { createSignal, For, type Accessor, type Component } from 'solid-js';
import { FLOW_ACTIVE_BG_500, FLOW_BG_400 } from '~/shared/constant';
import { getRange } from '~/shared/fx';
import { FlowColor } from '~/shared/types';
import { BottomSheet, X } from '~/shared/ui';
import { getWeekWriting } from '../../fx';

type Props = {
  close: () => void;
  color: Accessor<FlowColor>;
  onSubmit: (weeks: number[]) => void;
  defaultWeeks: Accessor<number[]>;
};

export const NewChallengeItemWeekSelectSheet: Component<Props> = (props) => {
  const [weeks, setWeeks] = createSignal<number[]>(props.defaultWeeks());

  const disabled = () => weeks().length === 0;

  const weekClassName =
    'h-10 transition-all active:scale-90 rounded-[17px] shadow-sm active:shadow-md border border-gray-100 text-center leading-10';

  const activeWeekClassName = 'font-black day-selected text-gray-700';

  const inactiveWeekClassName = 'text-gray-300 font-bold';

  return (
    <BottomSheet close={props.close}>
      {(close) => (
        <>
          <div class='flex justify-between items-center mb-6'>
            <p class='font-semibold text-xl'>Select Specific Week</p>
            <button
              onClick={close}
              class='p-[7px] rounded-[42%] transition-all active:scale-[.95] bg-red-400 active:bg-red-500'
            >
              <X size={24} />
            </button>
          </div>

          <div class='flex flex-wrap gap-2 w-full'>
            <For each={getRange(6, 1)}>
              {(week) => (
                <div
                  onClick={() => {
                    setWeeks(
                      weeks().includes(week)
                        ? weeks().filter((it) => it !== week)
                        : weeks().concat(week)
                    );
                  }}
                  class={clsx(
                    weekClassName,
                    weeks().includes(week)
                      ? activeWeekClassName
                      : inactiveWeekClassName
                  )}
                  style={{
                    width: `calc(50% - 4px)`,
                  }}
                >
                  {getWeekWriting(week)}
                </div>
              )}
            </For>
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

              props.onSubmit([...weeks()].sort((a, b) => a - b));
            }}
          >
            Select
          </button>
        </>
      )}
    </BottomSheet>
  );
};
