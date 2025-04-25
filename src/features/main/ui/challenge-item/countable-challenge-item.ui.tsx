import { createSignal, splitProps } from 'solid-js';
import { CountableChallengeItemType } from '~/entities/main';
import { BluredPanel } from '../blured-panel';

type Props = CountableChallengeItemType & {
  onChange: (count: number | null) => void;
};

export const Countable = (originProps: Props) => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const [rest, challengeItem] = splitProps(originProps, ['onChange']);

  const challengeResultText = () => {
    if (challengeItem.count === null) return '⏳';
    if (
      challengeItem.type === 'over' &&
      challengeItem.count >= challengeItem.targetCount
    )
      return '🎉';
    if (
      challengeItem.type === 'under' &&
      challengeItem.count <= challengeItem.targetCount
    )
      return '🎉';
    return '❌';
  };

  return (
    <>
      <div
        class='p-2 rounded-xl transition-all active:scale-[0.98] active:bg-[rgb(255,255,255,0.6)] flex items-center justify-between'
        onClick={() => setIsBluredPanelShow(true)}
      >
        <p class='font-medium'>{challengeItem.name}</p>

        <p class='w-6 text-center'>{challengeResultText()}</p>
      </div>
      {isBluredPanelShow() && (
        <BluredPanel close={() => setIsBluredPanelShow(false)}>
          {(close) => (
            <div
              class='w-full h-full flex flex-col items-center justify-center relative'
              on:click={(e) => e.stopPropagation()}
            >
              <button
                on:click={close}
                class='p-2 rounded-[35%] transition-all active:scale-90 bg-rose-400 absolute right-6 top-6'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30'
                  height='30'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#FFFFFF'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='lucide lucide-x-icon lucide-x'
                >
                  <path d='M18 6 6 18' />
                  <path d='m6 6 12 12' />
                </svg>
              </button>
            </div>
          )}
        </BluredPanel>
      )}
    </>
  );
};
