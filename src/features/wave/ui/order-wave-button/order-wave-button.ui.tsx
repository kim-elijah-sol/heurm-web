import clsx from 'clsx';
import { createSignal, For, type Accessor, type Component } from 'solid-js';
import { waveQueries, WaveType } from '~/entities/wave';
import {
  FLOW_ACTIVE_BG_100_50,
  FLOW_ACTIVE_BG_500,
  FLOW_BG_400,
  FLOW_TEXT_200,
  FLOW_TEXT_500,
} from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type { FlowColor } from '~/shared/types';
import { ArrowDown, ArrowDownUp, ArrowUp, BottomSheet, X } from '~/shared/ui';

type Props = {
  color: Accessor<FlowColor>;
};

export const OrderWaveButton: Component<Props> = (props) => {
  const wave = waveQueries.getWaveQuery();

  const [orderingWave, setOrderingWave] =
    createSignal<WaveType.GetWaveResponse>([]);

  const [isBottomSheetOpened, _open, close] = createBoolean();

  const open = () => {
    setOrderingWave(wave.data ?? []);
    _open();
  };

  const reorderWave = (targetIndex: number, move: number) => {
    const reorderedWave = [...orderingWave()];

    const movedIndex = targetIndex + move;

    const targetTemp = reorderedWave[targetIndex];
    const movedTarget = reorderedWave[movedIndex];

    reorderedWave[targetIndex] = movedTarget;
    reorderedWave[movedIndex] = targetTemp;

    setOrderingWave(reorderedWave);
  };

  return (
    <>
      <button
        class={clsx(
          'p-2 rounded-[42%] transition-all active:scale-95',
          FLOW_BG_400[props.color()],
          FLOW_ACTIVE_BG_500[props.color()]
        )}
        onClick={open}
      >
        <ArrowDownUp />
      </button>

      {isBottomSheetOpened() && (
        <BottomSheet close={close}>
          {(close) => (
            <>
              <div class='flex justify-between items-center mb-4'>
                <p class='font-semibold text-xl'>Reorder Waves</p>
                <button
                  onClick={close}
                  class='p-[7px] rounded-[42%] transition-all active:scale-[.95] bg-red-400 active:bg-red-500'
                >
                  <X size={24} />
                </button>
              </div>

              <div class='max-h-[30vh] overflow-y-auto w-full'>
                <div class='flex flex-col gap-3'>
                  <For each={orderingWave()}>
                    {(wave, index) => (
                      <div class='flex justify-between items-center'>
                        <p class='font-semibold text-lg'>{wave.name}</p>

                        <div class='flex gap-1'>
                          <button
                            onClick={() => reorderWave(index(), -1)}
                            disabled={index() === 0}
                            class={clsx(
                              'p-1 rounded-[42%] transition-all active:scale-95',
                              FLOW_ACTIVE_BG_100_50[props.color()],
                              index() !== 0
                                ? FLOW_TEXT_500[props.color()]
                                : FLOW_TEXT_200[props.color()]
                            )}
                          >
                            <ArrowUp />
                          </button>
                          <button
                            onClick={() => reorderWave(index(), 1)}
                            disabled={index() === orderingWave().length - 1}
                            class={clsx(
                              'p-1 rounded-[42%] transition-all active:scale-95',
                              FLOW_ACTIVE_BG_100_50[props.color()],
                              index() !== orderingWave().length - 1
                                ? FLOW_TEXT_500[props.color()]
                                : FLOW_TEXT_200[props.color()]
                            )}
                          >
                            <ArrowDown />
                          </button>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white my-5' />

              <button
                class={clsx(
                  'w-full text-white font-semibold h-12 rounded-[20px] transition-all active:scale-95 disabled:active:scale-100 disabled:bg-gray-300 disabled:active:bg-gray-300',
                  FLOW_BG_400[props.color()],
                  FLOW_ACTIVE_BG_500[props.color()]
                )}
                onClick={async () => {
                  close();
                }}
              >
                Save
              </button>
            </>
          )}
        </BottomSheet>
      )}
    </>
  );
};
