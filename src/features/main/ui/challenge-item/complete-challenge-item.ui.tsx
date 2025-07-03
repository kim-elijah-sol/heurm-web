import clsx from 'clsx';
import { format } from 'date-fns';
import { createSignal, type Accessor, type Component } from 'solid-js';
import { mainConstant, mainQueries } from '~/entities/main';
import {
  CHALLENGE_TEXT_COLOR_200,
  CHALLENGE_TEXT_COLOR_300,
  CHALLENGE_TEXT_COLOR_500,
} from '~/shared/constant';
import { getRandomItem } from '~/shared/fx';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import type { FlowColor } from '~/shared/types';
import { Ban, Check, Loader, Panel } from '~/shared/ui';
import { createDateSelect } from '../../hook';
import './result-scaling.ui.css';

type Props = {
  name: Accessor<string>;
  challengeId: Accessor<string>;
  challengeItemId: Accessor<string>;
  color: Accessor<FlowColor>;
};

export const Complete: Component<Props> = (props) => {
  const { current } = createDateSelect();

  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const [scaling, animStart, animEnd] = createBoolean();

  const name = () => props.name();

  const getHistory = mainQueries.getHistoryQuery(() => ({
    challengeId: props.challengeId(),
    challengeItemId: props.challengeItemId(),
  }));

  const postHistory = mainQueries.postHistoryMutation(() =>
    getHistory.refetch()
  );

  const patchHistory = mainQueries.patchHistoryMutation(() =>
    getHistory.refetch()
  );

  const getWinWriting = () => getRandomItem(mainConstant.WIN_WRITING);

  const getLoseWriting = () => getRandomItem(mainConstant.LOSE_WRITING);

  const currentHistory = () =>
    getHistory.data?.find(
      (it) => format(it.date, 'yyyy.MM.dd') === format(current(), 'yyyy.MM.dd')
    );

  const isCompleted = () => currentHistory()?.complete ?? null;

  const challengeResultIcon = () =>
    isCompleted() === null ? Loader : isCompleted() ? Check : Ban;

  const handleClickCTA = async (isCompleted: boolean | null) => {
    if (currentHistory()) {
      await patchHistory.mutateAsync({
        id: currentHistory()!.id,
        challengeId: props.challengeId(),
        challengeItemId: props.challengeItemId(),
        complete: isCompleted,
      });
    } else {
      await postHistory.mutateAsync({
        challengeId: props.challengeId(),
        challengeItemId: props.challengeItemId(),
        type: 'COMPLETE',
        complete: isCompleted,
        date: format(current(), 'yyyy-MM-dd'),
      });
    }

    if (isCompleted === true) {
      toast.open(`🎉 great! '${name()}' is complete!<br/>${getWinWriting()}`);
    } else if (isCompleted === false) {
      toast.open(getLoseWriting());
    }

    animStart();
    setTimeout(() => {
      animEnd();
    }, 350);
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
            isCompleted()
              ? clsx('font-bold', CHALLENGE_TEXT_COLOR_500[props.color()])
              : isCompleted() === false
              ? clsx('font-semibold', CHALLENGE_TEXT_COLOR_300[props.color()])
              : 'text-gray-400 font-semibold'
          }
        >
          {name()}
        </p>

        <div
          class={
            isCompleted()
              ? CHALLENGE_TEXT_COLOR_500[props.color()]
              : isCompleted() === false
              ? CHALLENGE_TEXT_COLOR_300[props.color()]
              : CHALLENGE_TEXT_COLOR_200[props.color()]
          }
        >
          <div class={scaling() ? 'scaling' : undefined}>
            {challengeResultIcon()({
              size: 24,
              strokeWidth: 3,
              stroke: 'currentColor',
            })}
          </div>
        </div>
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
                  onClick={() => handleClickCTA(false)}
                >
                  <Ban size={40} />
                </button>
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-emerald-400 active:bg-emerald-500'
                  )}
                  onClick={() => handleClickCTA(true)}
                >
                  <Check size={40} />
                </button>
              </div>
              <button
                class={clsx(
                  buttonBaseClassName,
                  'bg-blue-400 active:bg-blue-500'
                )}
                onClick={() => handleClickCTA(null)}
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
