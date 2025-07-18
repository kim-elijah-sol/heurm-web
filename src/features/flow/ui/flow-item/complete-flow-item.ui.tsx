import clsx from 'clsx';
import { format } from 'date-fns';
import { type Component } from 'solid-js';
import { historyQueries } from '~/entities/history';
import { mainConstant } from '~/entities/main';
import { createDateSelect } from '~/features/main/hook';
import {
  FLOW_BG_500,
  FLOW_INSET_RING_500,
  FLOW_STROKE_200,
  FLOW_TEXT_500,
} from '~/shared/constant';
import { getRandomItem } from '~/shared/fx';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import type { FlowColor } from '~/shared/types';
import { Ban, Check, Loader, Panel } from '~/shared/ui';
import { TypeLabel } from '.';
import { FlowItemProps } from '../../types';

export const CompleteFlowItem: Component<FlowItemProps> = (props) => {
  const flow = () => props.flow();

  const id = () => flow().id;

  const name = () => flow().name;

  const color = () => flow().color as FlowColor;

  const type = () => flow().type;

  const { current } = createDateSelect();

  const [isBluredPanelShow, open, close] = createBoolean();

  const [scaling, animStart, animEnd] = createBoolean();

  const history = historyQueries.getHistoryQuery(() => ({
    flowId: id(),
  }));

  const postHistory = historyQueries.postHistoryMutation(() => {
    history.refetch();
  });

  const patchHistory = historyQueries.patchHistoryMutation(() => {
    history.refetch();
  });

  const handleClickCTA = async (isCompleted: boolean | null) => {
    if (currentHistory()) {
      await patchHistory.mutateAsync({
        id: currentHistory()!.id,
        flowId: id(),
        complete: isCompleted,
      });
    } else {
      await postHistory.mutateAsync({
        flowId: id(),
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
    }, 600);
  };

  const getWinWriting = () => getRandomItem(mainConstant.WIN_WRITING);

  const getLoseWriting = () => getRandomItem(mainConstant.LOSE_WRITING);

  const currentHistory = () =>
    history.data?.find(
      (it) => format(it.date, 'yyyy.MM.dd') === format(current(), 'yyyy.MM.dd')
    );

  const isCompleted = () => currentHistory()?.complete ?? null;

  const flowResultIcon = () =>
    isCompleted() === null ? Loader : isCompleted() ? Check : Ban;

  const buttonBaseClassName =
    'p-5 rounded-[42%] transition-all active:scale-95';

  const textColor = () =>
    isCompleted() ? 'text-white' : FLOW_TEXT_500[color()];

  return (
    <div
      onClick={open}
      class={clsx(
        'px-4 py-3 rounded-[24px] transition-all active:scale-95 relative overflow-hidden bg-white inset-ring-2',
        FLOW_INSET_RING_500[color()]
      )}
    >
      <div
        class={clsx(
          'inset-0 absolute transition-all duration-500 z-1',
          FLOW_BG_500[color()],
          isCompleted() === true ? 'right-0' : 'right-full'
        )}
      />

      <div class='relative z-2'>
        <TypeLabel type={type()} isCompleted={isCompleted} color={color} />
        <div class='flex justify-between items-center'>
          <p
            class={clsx(
              'font-semibold text-lg transition-all duration-500',
              textColor()
            )}
          >
            {name()}
          </p>
          <div class={scaling() ? 'scaling' : undefined}>
            {flowResultIcon()({
              size: 24,
              strokeWidth: 3,
              stroke: isCompleted() ? 'white' : undefined,
              className: isCompleted() ? undefined : FLOW_STROKE_200[color()],
            })}
          </div>
        </div>
      </div>

      {isBluredPanelShow() && (
        <Panel.Blured close={close}>
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
    </div>
  );
};
