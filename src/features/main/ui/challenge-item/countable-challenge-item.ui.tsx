import clsx from 'clsx';
import { Component, createEffect, createSignal, splitProps } from 'solid-js';
import { Nullable } from '~/shared/model';
import { Ban, Check, Loader, Panel } from '~/shared/ui';

type Props = {
  type: 'OVER' | 'UNDER';
  name: string;
  targetCount: number;
  count: Nullable<number>;
  onChange: (count: Nullable<number>) => void;
};

export const Countable: Component<Props> = (originProps) => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const [rest, challengeItem] = splitProps(originProps, ['onChange']);

  const [value, setValue] = createSignal(challengeItem.count?.toString() ?? '');

  const getChallengeResult = (count: Nullable<number>) => {
    if (count === null) return null;
    if (challengeItem.type === 'OVER' && count >= challengeItem.targetCount)
      return true;
    if (challengeItem.type === 'UNDER' && count <= challengeItem.targetCount)
      return true;
    return false;
  };

  const valueToCount = () => (value() ? Number(value()) : null);

  const serverChallengeResult = () => getChallengeResult(challengeItem.count);

  const localChallengeResult = () => getChallengeResult(valueToCount());

  const challengeResultText = () =>
    serverChallengeResult()
      ? '🎉'
      : serverChallengeResult() === false
      ? '❌'
      : '⏳';

  const icon = () =>
    serverChallengeResult()
      ? Check
      : serverChallengeResult() === false
      ? Ban
      : Loader;

  const nameTextClass = () =>
    serverChallengeResult() === null
      ? 'text-gray-500 font-medium'
      : serverChallengeResult()
      ? 'text-emerald-500 font-bold'
      : 'text-rose-500 font-semibold';

  const buttonColor = () =>
    localChallengeResult()
      ? 'bg-emerald-400 active:bg-emerald-500'
      : localChallengeResult() === false
      ? 'bg-rose-400 active:bg-rose-500'
      : 'bg-blue-400 active:bg-blue-500';

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
        <p class={nameTextClass()}>{challengeItem.name}</p>

        <p class='w-6 text-center'>{challengeResultText()}</p>
      </div>
      {isBluredPanelShow() && (
        <Panel.Blured
          autoClose={false}
          close={() => setIsBluredPanelShow(false)}
        >
          {(close) => (
            <div class='w-full h-full flex flex-col items-center justify-center relative touch-none'>
              <Panel.CloseButton onClick={close} />

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
                onInput={(e) => setValue(e.target.value)}
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
                {icon()({})}
              </button>
            </div>
          )}
        </Panel.Blured>
      )}
    </>
  );
};
