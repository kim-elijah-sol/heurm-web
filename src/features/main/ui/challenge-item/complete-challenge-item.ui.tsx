import clsx from 'clsx';
import { createSignal, splitProps, type Component } from 'solid-js';
import type { Nullable } from '~/shared/types';
import { Ban, Check, Loader, Panel } from '~/shared/ui';

type Props = {
  name: string;
  isCompleted: Nullable<boolean>;
  onChange: (isCompleted: Nullable<boolean>) => void;
};

export const Complete: Component<Props> = (originProps) => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const [rest, challengeItem] = splitProps(originProps, ['onChange']);

  const challengeResultText = () =>
    challengeItem.isCompleted === null
      ? '⏳'
      : challengeItem.isCompleted
      ? '🎉'
      : '❌';

  const buttonBaseClassName =
    'p-5 rounded-[42%] transition-all active:scale-90';

  return (
    <>
      <div
        class='p-2 rounded-xl transition-all active:scale-[0.98] active:bg-[rgb(255,255,255,0.6)] flex items-center justify-between'
        onClick={() => setIsBluredPanelShow(true)}
      >
        <p
          class={
            challengeItem.isCompleted === null
              ? 'text-gray-500 font-medium'
              : challengeItem.isCompleted
              ? 'text-emerald-500 font-bold'
              : 'text-rose-500 font-semibold'
          }
        >
          {challengeItem.name}
        </p>

        <p class='w-6 text-center'>{challengeResultText()}</p>
      </div>
      {isBluredPanelShow() && (
        <Panel.Blured close={() => setIsBluredPanelShow(false)}>
          {() => (
            <div class='w-full h-full flex flex-col items-center justify-center gap-6 touch-none'>
              <div class='flex gap-10'>
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-rose-400 active:bg-rose-500'
                  )}
                  on:click={() => rest.onChange(false)}
                >
                  <Ban size={40} />
                </button>
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-emerald-400 active:bg-emerald-500'
                  )}
                  on:click={() => rest.onChange(true)}
                >
                  <Check size={40} />
                </button>
              </div>
              <button
                class={clsx(
                  buttonBaseClassName,
                  'bg-blue-400 active:bg-blue-500'
                )}
                on:click={() => rest.onChange(null)}
              >
                <Loader size={40} />
              </button>
            </div>
          )}
        </Panel.Blured>
      )}
    </>
  );
};
