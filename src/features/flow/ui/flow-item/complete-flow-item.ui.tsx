import clsx from 'clsx';
import { format } from 'date-fns';
import { createSignal, type Component } from 'solid-js';
import { historyQueries } from '~/entities/history';
import { mainConstant } from '~/entities/main';
import { createDateSelect } from '~/features/main/hook';
import { EditFlowPanel } from '~/panel-pages/edit-flow-panel';
import { FLOW_STROKE_200 } from '~/shared/constant';
import { getRandomItem } from '~/shared/fx';
import { createBoolean, createLongPress } from '~/shared/hook';
import { toast } from '~/shared/lib';
import type { FlowColor } from '~/shared/types';
import { Check, Loader, Panel, X } from '~/shared/ui';
import { TypeLabel } from '.';
import { FlowItemColorContext } from '../../context';
import { findCurrentHistory } from '../../fx';
import { createBluredPanelShow } from '../../hook/create-blured-panel-show.hook';
import { FlowItemProps } from '../../types';
import './complete-flow-item.ui.css';
import { FlowItemComponent } from './flow-item-component.ui';

export const CompleteFlowItem: Component<FlowItemProps> = (props) => {
  const flow = () => props.flow();

  const id = () => flow().id;

  const name = () => flow().name;

  const color = () => flow().color as FlowColor;

  const type = () => flow().type;

  const { current } = createDateSelect();

  const [isCTAPanelOpened, openCTAPanel, closeCTAPanel] =
    createBluredPanelShow();

  const [isEditFlowPanelOpened, openEditFlowPanel, closeEditFlowPanel] =
    createBoolean();

  const { onTouchStart, onTouchEnd } = createLongPress({
    onClick: openCTAPanel,
    onLongPress: openEditFlowPanel,
  });

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

  const currentHistory = () => history.data?.find(findCurrentHistory(current));

  const isCompleted = () => currentHistory()?.complete ?? null;

  const flowResultIcon = () =>
    isCompleted() === null ? Loader : isCompleted() ? Check : X;

  return (
    <FlowItemColorContext.Provider value={color()}>
      <FlowItemComponent.Wrapper
        on:touchstart={onTouchStart}
        on:touchend={onTouchEnd}
      >
        <FlowItemComponent.StatusBg
          isFill={() => isCompleted() !== null}
          isPale={() => isCompleted() === false}
        />

        <FlowItemComponent.Content>
          <TypeLabel type={type()} isCompleted={isCompleted} color={color} />
          <FlowItemComponent.Main>
            <FlowItemComponent.Name isWhite={isCompleted()}>
              {name()}
            </FlowItemComponent.Name>
            <div class={scaling() ? 'scaling' : undefined}>
              {flowResultIcon()({
                size: 24,
                strokeWidth: 3,
                stroke: isCompleted() ? 'white' : undefined,
                className: isCompleted() ? undefined : FLOW_STROKE_200[color()],
              })}
            </div>
          </FlowItemComponent.Main>
        </FlowItemComponent.Content>

        {isCTAPanelOpened() && (
          <CTAPanel close={closeCTAPanel} onCTA={handleClickCTA} />
        )}
        {isEditFlowPanelOpened() && (
          <EditFlowPanel close={closeEditFlowPanel} flow={flow} />
        )}
      </FlowItemComponent.Wrapper>
    </FlowItemColorContext.Provider>
  );
};

type CTAPanelProps = {
  onCTA: (isCompleted: boolean | null) => void;
  close: () => void;
};

const CTAPanel: Component<CTAPanelProps> = (props) => {
  const [clickedType, setClickedType] = createSignal<boolean | null>();

  const buttonBaseClassName =
    'p-5 rounded-[42%] transition-all active:scale-95';

  const handleClickCTA = (isCompleted: boolean | null, close: () => void) => {
    setClickedType(isCompleted);

    setTimeout(() => {
      close();
      props.onCTA(isCompleted);
    }, 800);
  };

  const getButtonClickedClass = (isCompleted: boolean | null) => {
    if (isCompleted === clickedType())
      return `cta-button-center-${isCompleted}`;
    if (clickedType() !== undefined) return 'cta-button-hide';
    return undefined;
  };

  return (
    <Panel.Blured autoClose={false} close={props.close}>
      {(close) => (
        <div
          class='w-full h-full flex items-center justify-center'
          onClick={close}
        >
          <div
            class='relative w-[200px] h-[184px]'
            onClick={(e) => e.stopPropagation()}
          >
            <div class='flex flex-col gap-6 items-center w-full'>
              <div
                class={clsx(
                  'flex w-full',
                  clickedType() === false ? 'justify-end' : 'justify-between'
                )}
              >
                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-rose-400 active:bg-rose-500',
                    getButtonClickedClass(false)
                  )}
                  onClick={() => handleClickCTA(false, close)}
                >
                  <X size={40} />
                </button>

                <button
                  class={clsx(
                    buttonBaseClassName,
                    'bg-emerald-400 active:bg-emerald-500',
                    getButtonClickedClass(true)
                  )}
                  onClick={() => handleClickCTA(true, close)}
                >
                  <Check size={40} />
                </button>
              </div>

              <button
                class={clsx(
                  buttonBaseClassName,
                  'bg-blue-400 active:bg-blue-500',
                  getButtonClickedClass(null)
                )}
                onClick={() => handleClickCTA(null, close)}
              >
                <Loader size={40} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Panel.Blured>
  );
};
