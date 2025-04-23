import clsx from 'clsx';
import { Ban, Check, Loader } from 'lucide-solid';
import { createSignal, splitProps } from 'solid-js';
import { CompleteChallengeItemType } from '~/entities/main';
import { BluredPanel } from '../blured-panel';

type Props = CompleteChallengeItemType & {
  onChange: (isCompleted: boolean | null) => void;
};

export const Complete = (originProps: Props) => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const [rest, challengeItem] = splitProps(originProps, ['onChange']);

  const itemClassName = () =>
    clsx(
      'p-2 rounded-xl transition-all active:scale-[0.98] active:bg-[rgb(255,255,255,0.6)] flex items-center justify-between'
    );

  const challengeResultText = () =>
    challengeItem.isCompleted === null
      ? '⏳'
      : challengeItem.isCompleted
      ? '🎉'
      : '❌';

  const buttonBaseClassName =
    'p-6 rounded-[35%] transition-all active:scale-90';

  return (
    <>
      <div class={itemClassName()} onClick={() => setIsBluredPanelShow(true)}>
        <p class='font-medium'>{challengeItem.name}</p>

        <p class='w-6 text-center'>{challengeResultText()}</p>
      </div>
      {isBluredPanelShow() && (
        <BluredPanel close={() => setIsBluredPanelShow(false)}>
          <div class='w-full h-full flex flex-col items-center justify-center gap-8'>
            <div class='flex gap-12'>
              <button
                class={clsx(
                  buttonBaseClassName,
                  'bg-rose-400 active:bg-rose-500'
                )}
                on:click={() => rest.onChange(false)}
              >
                <Ban size={36} color='#FFFFFF' />
              </button>
              <button
                class={clsx(
                  buttonBaseClassName,
                  'bg-emerald-400 active:bg-emerald-500'
                )}
                on:click={() => rest.onChange(true)}
              >
                <Check size={36} color='#FFFFFF' />
              </button>
            </div>
            <button
              class={clsx(
                buttonBaseClassName,
                'bg-blue-400 active:bg-blue-500'
              )}
              on:click={() => rest.onChange(null)}
            >
              <Loader size={36} color='#FFFFFF' />
            </button>
          </div>
        </BluredPanel>
      )}
    </>
  );
};
