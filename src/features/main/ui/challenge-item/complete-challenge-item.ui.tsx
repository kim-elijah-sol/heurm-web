import clsx from 'clsx';
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
          {() => (
            <div class='w-full h-full flex flex-col items-center justify-center gap-8'>
              <div class='flex gap-12'>
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-rose-400 active:bg-rose-500'
                  )}
                  on:click={() => rest.onChange(false)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='36'
                    height='36'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    class='lucide lucide-ban-icon lucide-ban'
                  >
                    <circle cx='12' cy='12' r='10' />
                    <path d='m4.9 4.9 14.2 14.2' />
                  </svg>
                </button>
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-emerald-400 active:bg-emerald-500'
                  )}
                  on:click={() => rest.onChange(true)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='36'
                    height='36'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#FFFFFF'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    class='lucide lucide-check-icon lucide-check'
                  >
                    <path d='M20 6 9 17l-5-5' />
                  </svg>
                </button>
              </div>
              <button
                class={clsx(
                  buttonBaseClassName,
                  'bg-blue-400 active:bg-blue-500'
                )}
                on:click={() => rest.onChange(null)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='36'
                  height='36'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#FFFFFF'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='lucide lucide-loader-icon lucide-loader'
                >
                  <path d='M12 2v4' />
                  <path d='m16.2 7.8 2.9-2.9' />
                  <path d='M18 12h4' />
                  <path d='m16.2 16.2 2.9 2.9' />
                  <path d='M12 18v4' />
                  <path d='m4.9 19.1 2.9-2.9' />
                  <path d='M2 12h4' />
                  <path d='m4.9 4.9 2.9 2.9' />
                </svg>
              </button>
            </div>
          )}
        </BluredPanel>
      )}
    </>
  );
};
