import { useQueryClient } from '@tanstack/solid-query';
import clsx from 'clsx';
import { createSignal, type Accessor, type Component } from 'solid-js';
import { waveQueries } from '~/entities/wave';
import { FLOW_ACTIVE_BG_500, FLOW_BG_400 } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import type { FlowColor } from '~/shared/types';
import { BottomSheet, Plus } from '~/shared/ui';

type Props = {
  color: Accessor<FlowColor>;
};

export const NewWaveButton: Component<Props> = (props) => {
  const queryClient = useQueryClient();

  const [name, setName] = createSignal<string>('');

  const disabled = () => name().trim().length === 0;

  const [isBottomSheetOpened, open, _close] = createBoolean();

  const close = () => {
    _close();
    setName('');
  };

  const postWave = waveQueries.postWaveMutation(() => {
    queryClient.invalidateQueries({
      queryKey: waveQueries.keys.get.queryKey,
    });
  });

  return (
    <>
      <button
        class={clsx(
          'p-1.5 rounded-[42%] transition-all active:scale-95',
          FLOW_BG_400[props.color()],
          FLOW_ACTIVE_BG_500[props.color()]
        )}
        onClick={open}
      >
        <Plus />
      </button>

      {isBottomSheetOpened() && (
        <BottomSheet close={close}>
          {(close) => (
            <>
              <BottomSheet.Top className='mb-6'>
                <BottomSheet.Top.Title>New Wave</BottomSheet.Top.Title>
                <BottomSheet.Top.CloseButton />
              </BottomSheet.Top>

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
                  await postWave.mutateAsync({ name: name().trim() });

                  close();
                }}
              >
                Add Wave
              </button>
            </>
          )}
        </BottomSheet>
      )}
    </>
  );
};
