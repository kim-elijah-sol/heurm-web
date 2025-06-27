import clsx from 'clsx';
import { createSignal, type Accessor, type Component } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { getRandomItem } from '~/shared/fx';
import { toast } from '~/shared/lib';
import { Ban, Check, Loader, Panel } from '~/shared/ui';

type Props = {
  name: Accessor<string>;
  challengeId: Accessor<string>;
  challengeItemId: Accessor<string>;
};

export const Complete: Component<Props> = (props) => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const name = () => props.name();

  const isCompleted = () => null;

  const getWinWriting = () => getRandomItem(mainConstant.WIN_WRITING);

  const getLoseWriting = () => getRandomItem(mainConstant.LOSE_WRITING);

  const challengeResultText = () =>
    isCompleted() === null ? '⏳' : isCompleted() ? '🎉' : '❌';

  const toastResult = (isCompleted: boolean | null) => {
    if (isCompleted === true) {
      toast.open(
        `🎉 great! '${name()}' challenge is complete!<br/>${getWinWriting()}`
      );
    } else if (isCompleted === false) {
      toast.open(getLoseWriting());
    }
  };

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
            isCompleted() === null
              ? 'text-gray-500 font-medium'
              : isCompleted()
              ? 'text-emerald-500 font-bold'
              : 'text-rose-500 font-semibold'
          }
        >
          {name()}
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
                  onClick={() => toastResult(false)}
                >
                  <Ban size={40} />
                </button>
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-emerald-400 active:bg-emerald-500'
                  )}
                  onClick={() => toastResult(true)}
                >
                  <Check size={40} />
                </button>
              </div>
              <button
                class={clsx(
                  buttonBaseClassName,
                  'bg-blue-400 active:bg-blue-500'
                )}
                onClick={() => toastResult(null)}
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
