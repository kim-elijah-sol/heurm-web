import { useQueryClient } from '@tanstack/solid-query';
import clsx from 'clsx';
import { createSignal, type Accessor, type Component } from 'solid-js';
import { waveQueries } from '~/entities/wave';
import {
  FLOW_ACTIVE_BG_500,
  FLOW_BG_400,
  FLOW_TEXT_500,
} from '~/shared/constant';
import { createBoolean, createLongPress } from '~/shared/hook';
import type { FlowColor } from '~/shared/types';
import { BottomSheet, X } from '~/shared/ui';

type Props = {
  children: string;
  onClick: () => void;
  selected: Accessor<boolean>;
  color: Accessor<FlowColor>;
  id: string;
};

export const WaveItem: Component<Props> = (props) => {
  const queryClient = useQueryClient();

  const defaultName = props.children.toString();

  const [name, setName] = createSignal<string>(defaultName);

  const disabled = () =>
    name().trim().length === 0 || name().trim() === defaultName;

  const [isBottomSheetOpened, open, _close] = createBoolean();

  const close = () => {
    _close();
    setName(defaultName);
  };

  const { onTouchStart, onTouchEnd } = createLongPress({
    onClick: props.onClick,
    onLongPress: open,
  });

  const patchWave = waveQueries.patchWaveMutation(() => {
    queryClient.invalidateQueries({
      queryKey: waveQueries.keys.get.queryKey,
    });
  });

  return (
    <>
      <button
        on:touchstart={onTouchStart}
        on:touchend={onTouchEnd}
        class={clsx(
          'font-semibold px-3 py-1.5 rounded-[16px] transition-all active:scale-95',
          /** BACKGROUND */ props.selected() ? 'bg-slate-200' : 'bg-slate-100',
          /** TEXT COLOR */ props.selected()
            ? FLOW_TEXT_500[props.color()]
            : 'text-gray-600',
          /** ACTIVE BACKGROUND */ props.selected()
            ? 'active:bg-slate-400/70'
            : 'active:bg-slate-200/70'
        )}
      >
        {props.children}
      </button>
      {isBottomSheetOpened() && (
        <BottomSheet close={close}>
          {(close) => (
            <>
              <div class='flex justify-between items-center mb-6'>
                <p class='font-semibold text-xl'>Edit Wave</p>
                <button
                  onClick={close}
                  class='p-[7px] rounded-[42%] transition-all active:scale-[.95] bg-red-400 active:bg-red-500'
                >
                  <X size={24} />
                </button>
              </div>

              <input
                type='text'
                placeholder='wave name'
                class='font-semibold px-4 py-3 rounded-[20px] w-full transition-all bg-slate-100 focus:bg-slate-200'
                value={name()}
                onInput={(e) => setName(e.target.value)}
              />

              <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white my-4' />

              <button
                disabled={disabled()}
                class={clsx(
                  'w-full text-white font-semibold h-12 rounded-[20px] transition-all active:scale-95 disabled:active:scale-100 disabled:bg-gray-300 disabled:active:bg-gray-300',
                  FLOW_BG_400[props.color()],
                  FLOW_ACTIVE_BG_500[props.color()]
                )}
                onClick={async () => {
                  await patchWave.mutateAsync({
                    id: props.id,
                    name: name().trim(),
                  });

                  close();
                }}
              >
                Edit Wave
              </button>
            </>
          )}
        </BottomSheet>
      )}
    </>
  );
};
