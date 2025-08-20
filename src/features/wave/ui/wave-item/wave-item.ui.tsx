import { useQueryClient } from '@tanstack/solid-query';
import clsx from 'clsx';
import { createSignal, type Accessor, type Component } from 'solid-js';
import { waveQueries } from '~/entities/wave';
import {
  FLOW_ACTIVE_BG_500,
  FLOW_BG_400,
  FLOW_TEXT_500,
} from '~/shared/constant';
import { delay } from '~/shared/fx';
import { createBoolean, createLongPress } from '~/shared/hook';
import { toast } from '~/shared/lib';
import type { FlowColor } from '~/shared/types';
import { BottomSheet } from '~/shared/ui';

type Props = {
  children: string;
  onClick: () => void;
  selected: Accessor<boolean>;
  color?: Accessor<FlowColor>;
  id?: string;
};

export const WaveItem: Component<Props> = (props) => {
  const queryClient = useQueryClient();

  const defaultName = props.children.toString();

  const [name, setName] = createSignal<string>(defaultName);

  const disabled = () =>
    name().trim().length === 0 || name().trim() === defaultName;

  const [isEditBottomSheetOpened, _openEditBottomSheet, _closeEditBottomSheet] =
    createBoolean();

  const openEditBottomSheet = () => {
    if (props.id) {
      _openEditBottomSheet();
    }
  };

  const closeEditBottomSheet = () => {
    _closeEditBottomSheet();
    setName(defaultName);
  };

  const [
    isDeleteBottomSheetOpened,
    openDeleteBottomSheet,
    closeDeleteBottomSheet,
  ] = createBoolean();

  const { onTouchStart, onTouchEnd } = createLongPress({
    onClick: props.onClick,
    onLongPress: openEditBottomSheet,
  });

  const patchWave = waveQueries.patchWaveMutation(() => {
    queryClient.invalidateQueries({
      queryKey: waveQueries.keys.get.queryKey,
    });
  });

  const deleteWave = waveQueries.deleteWaveMutation();

  const backgroundColor = () =>
    props.selected() ? 'bg-slate-200' : 'bg-slate-100';

  const activeBackgroundColor = () =>
    props.selected() ? 'active:bg-slate-400/70' : 'active:bg-slate-200/70';

  const textColor = () => {
    if (props.selected() === false) return 'text-gray-600';

    if (props.color) return FLOW_TEXT_500[props.color()];

    return 'text-gray-900';
  };

  return (
    <>
      <button
        on:touchstart={onTouchStart}
        on:touchend={onTouchEnd}
        class={clsx(
          'font-semibold px-3 py-1.5 rounded-[16px] transition-all active:scale-95',
          backgroundColor(),
          activeBackgroundColor(),
          textColor()
        )}
      >
        {props.children}
      </button>
      {isEditBottomSheetOpened() && (
        <BottomSheet close={closeEditBottomSheet}>
          {(closeEditBottomSheet) => (
            <>
              <BottomSheet.Top className='mb-6'>
                <BottomSheet.Top.Title>Edit Wave</BottomSheet.Top.Title>
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
                  props.color && FLOW_BG_400[props.color()],
                  props.color && FLOW_ACTIVE_BG_500[props.color()]
                )}
                onClick={async () => {
                  await patchWave.mutateAsync({
                    id: props.id!,
                    name: name().trim(),
                  });

                  closeEditBottomSheet();
                }}
              >
                Edit Wave
              </button>

              <div class='mt-3 flex justify-center'>
                <button
                  class='font-semibold text-sm text-slate-400 py-1 px-2 rounded-[10px] transition-all active:scale-95 active:bg-slate-200'
                  onClick={openDeleteBottomSheet}
                >
                  Delete This Wave
                </button>
              </div>

              {isDeleteBottomSheetOpened() && (
                <BottomSheet close={closeDeleteBottomSheet}>
                  {(closeDeleteBottomSheet) => (
                    <>
                      <BottomSheet.Top className='mb-4'>
                        <BottomSheet.Top.Title>
                          Delete {props.children} Wave
                        </BottomSheet.Top.Title>
                        <BottomSheet.Top.CloseButton />
                      </BottomSheet.Top>

                      <p class='font-semibold text-lg mb-2'>Are You Sure?</p>

                      <p class='font-medium text-sm text-slate-500'>
                        Are you sure you want to delete this wave?
                        <br />
                        This action cannot be undone, and all related waves will
                        be permanently removed.
                      </p>

                      <ul class='mt-2 text-sm text-slate-400'>
                        <li>· Deleting the wave will not remove any flows.</li>
                        <li>
                          · However, flows assigned to this wave will become
                          uncategorized.
                        </li>
                      </ul>

                      <div class='w-full h-[1px] bg-linear-to-r from-white via-slate-300 to-white my-4' />

                      <button
                        class='w-full text-white font-semibold py-4 rounded-[24px] bg-slate-300 transition-all active:scale-95 active:bg-slate-400'
                        onClick={async () => {
                          await deleteWave.mutateAsync({
                            id: props.id!,
                          });

                          closeDeleteBottomSheet();

                          await delay(300);

                          closeEditBottomSheet();

                          await delay(300);

                          queryClient.invalidateQueries({
                            queryKey: waveQueries.keys.get.queryKey,
                          });

                          toast.open(`${props.children} is deleted.`);
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </BottomSheet>
              )}
            </>
          )}
        </BottomSheet>
      )}
    </>
  );
};
