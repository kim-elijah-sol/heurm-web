import clsx from 'clsx';
import { createEffect, createSignal, splitProps } from 'solid-js';
import { CountableChallengeItemType } from '~/entities/main';
import { Ban, Check, Loader } from '~/shared/ui';
import { BluredPanel } from '../blured-panel';

type Props = CountableChallengeItemType & {
  onChange: (count: number | null) => void;
};

export const Countable = (originProps: Props) => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const [rest, challengeItem] = splitProps(originProps, ['onChange']);

  const [value, setValue] = createSignal(originProps.count?.toString() ?? '');

  const getChallengeResult = (count: number | null) => {
    if (count === null) return null;
    if (challengeItem.type === 'over' && count >= challengeItem.targetCount)
      return true;
    if (challengeItem.type === 'under' && count <= challengeItem.targetCount)
      return true;
    return false;
  };

  const challengeResultText = () => {
    const result = getChallengeResult(challengeItem.count);

    return result ? '🎉' : result === false ? '❌' : '⏳';
  };

  const valueToCount = () => (value() ? Number(value()) : null);

  const icon = () => {
    const result = getChallengeResult(valueToCount());

    return result ? Check : result === false ? Ban : Loader;
  };

  const buttonColor = () => {
    const result = getChallengeResult(valueToCount());

    return result
      ? 'bg-emerald-400 active:bg-emerald-500'
      : result === false
      ? 'bg-rose-400 active:bg-rose-500'
      : 'bg-blue-400 active:bg-blue-500';
  };

  createEffect(() => {
    if (isBluredPanelShow()) {
      setValue(originProps.count?.toString() ?? '');
    }
  });

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
        <BluredPanel
          autoClose={false}
          close={() => setIsBluredPanelShow(false)}
        >
          {(close) => (
            <div class='w-full h-full flex flex-col items-center justify-center relative'>
              <button
                onClick={close}
                class='p-2 rounded-[35%] transition-all active:scale-90 bg-red-500 absolute right-6 top-6'
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

              <p class='text-[24px] text-slate-600 mb-4 font-semibold'>
                {challengeItem.targetCount.toLocaleString()}
              </p>

              <input
                id='count'
                type='number'
                pattern='[0-9]*'
                inputmode='numeric'
                class='text-center text-[64px] text-slate-800 font-semibold mb-8 placeholder:text-gray-400'
                placeholder='Current'
                value={value()}
                onChange={(e) => setValue(e.target.value)}
              />

              <button
                class={clsx(
                  'p-6 rounded-[35%] transition-all active:scale-90',
                  buttonColor()
                )}
                onClick={() => {
                  rest.onChange(valueToCount());
                  close();
                }}
              >
                {icon()()}
              </button>
            </div>
          )}
        </BluredPanel>
      )}
    </>
  );
};
