import clsx from 'clsx';
import { createSignal, For, type Accessor, type Component } from 'solid-js';
import { FLOW_ACTIVE_BG_500, FLOW_BG_400, FLOW_MONTH } from '~/shared/constant';
import { getRange } from '~/shared/fx';
import type { FlowColor } from '~/shared/types';
import { BottomSheet } from '~/shared/ui';

type Props = {
  close: () => void;
  color: Accessor<FlowColor>;
  onSubmit: (months: number[]) => void;
  defaultMonths: Accessor<number[]>;
};

export const FlowPanelMonthSelectSheet: Component<Props> = (props) => {
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
          <BottomSheet.Top className='mb-6'>
            <BottomSheet.Top.Title>Select Specific Month</BottomSheet.Top.Title>
            <BottomSheet.Top.CloseButton />
          </BottomSheet.Top>

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
              FLOW_BG_400[props.color()],
              FLOW_ACTIVE_BG_500[props.color()]
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
