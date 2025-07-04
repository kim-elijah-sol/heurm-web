import clsx from 'clsx';
import { createSignal, For, type Accessor, type Component } from 'solid-js';
import {
  CHALLENGE_400_BG_COLOR,
  CHALLENGE_ACTIVE_BG_500_COLOR,
  FLOW_MONTH,
} from '~/shared/constant';
import { getRange } from '~/shared/fx';
import { FlowColor } from '~/shared/types';
import { BottomSheet, X } from '~/shared/ui';

type Props = {
  close: () => void;
  color: Accessor<FlowColor>;
  onSubmit: (months: number[]) => void;
  defaultMonths: Accessor<number[]>;
};

export const NewChallengeItemMonthSelectSheet: Component<Props> = (props) => {
  const [months, setMonths] = createSignal<number[]>(props.defaultMonths());

  const disabled = () => months().length === 0;

  const monthClassName =
    'h-10 transition-all active:scale-90 rounded-[17px] shadow-sm active:shadow-md border border-gray-100 text-center leading-10';

  const activeMonthClassName = 'font-black day-selected text-gray-700';

  const inactiveMonthClassName = 'text-gray-300 font-bold';

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

          <div class='flex flex-wrap gap-2 w-full justify-center'>
            <For each={getRange(12, 0)}>
              {(month) => (
                <div
                  onClick={() => {
                    setMonths(
                      months().includes(month)
                        ? months().filter((it) => it !== month)
                        : months().concat(month)
                    );
                  }}
                  class={clsx(
                    monthClassName,
                    months().includes(month)
                      ? activeMonthClassName
                      : inactiveMonthClassName
                  )}
                  style={{
                    width: `calc(33.33% - 8px)`,
                  }}
                >
                  {FLOW_MONTH[month]}
                </div>
              )}
            </For>
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

              props.onSubmit([...months()].sort((a, b) => a - b));
            }}
          >
            Select
          </button>
        </>
      )}
    </BottomSheet>
  );
};
