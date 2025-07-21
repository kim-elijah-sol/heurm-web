import clsx from 'clsx';
import { format } from 'date-fns';
import {
  createEffect,
  createSignal,
  Show,
  type Accessor,
  type Component,
} from 'solid-js';
import { historyQueries, HistoryType } from '~/entities/history';
import { mainConstant } from '~/entities/main';
import { createDateSelect } from '~/features/main/hook';
import { FLOW_BG_300, FLOW_BG_500, FLOW_STROKE_200 } from '~/shared/constant';
import { dateFormat, getMidnight, getRandomItem } from '~/shared/fx';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import type {
  FlowColor,
  FlowIntervalType,
  FlowType,
  Nullable,
} from '~/shared/types';
import { Check, Loader, Panel, X } from '~/shared/ui';
import { PieChart, TypeLabel } from '.';
import { FlowItemColorContext } from '../../context';
import {
  accumulateHistoryCount,
  filterMonthHistory,
  filterValidFlow,
  filterWeekHistory,
  filterYearHistory,
} from '../../fx';
import { createBluredPanelShow } from '../../hook/create-blured-panel-show.hook';
import { type FlowItemProps } from '../../types';
import { FlowItemComponent } from './flow-item-component.ui';

export const CountableFlowItem: Component<FlowItemProps> = (props) => {
  const flow = () => props.flow();

  const id = () => flow().id;

  const name = () => flow().name;

  const color = () => flow().color as FlowColor;

  const type = () => flow().type;

  const targetCount = () => flow().targetCount!;

  const accumulateType = () => flow().accumulateType ?? 'DAILY';

  const { current } = createDateSelect();

  const [isBluredPanelShow, open, close] = createBluredPanelShow();

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

  const getWinWriting = () => getRandomItem(mainConstant.WIN_WRITING);

  const handleClickCTA = async (_count: string) => {
    const count = _count.trim().length ? Number(_count) : null;

    const isCompleted = (() => {
      if (type() === 'UNDER') return false;

      return stackedCountExceptCurrent() + (count ?? 0) >= targetCount();
    })();

    if (isCompleted === true) {
      toast.open(`🎉 great! '${name()}' is complete!<br/>${getWinWriting()}`);
    }

    if (currentHistory()) {
      await patchHistory.mutateAsync({
        id: currentHistory()!.id,
        flowId: id(),
        count,
      });
    } else {
      await postHistory.mutateAsync({
        flowId: id(),
        type: type(),
        count,
        date: format(current(), 'yyyy-MM-dd'),
      });
    }

    animStart();
    setTimeout(() => {
      animEnd();
    }, 350);
  };

  const historys = () =>
    (history.data ?? []).filter((it) =>
      filterValidFlow(getMidnight(it.date).valueOf())(props.flow())
    );

  const currentHistory = () =>
    historys().find(
      (it) => format(it.date, 'yyyy.MM.dd') === format(current(), 'yyyy.MM.dd')
    );

  const stackedCount = () => {
    if (accumulateType() === 'DAILY') return currentHistory()?.count ?? 0;

    const filterFn =
      accumulateType() === 'WEEKLY'
        ? filterWeekHistory
        : accumulateType() === 'MONTHLY'
        ? filterMonthHistory
        : filterYearHistory;

    return (
      historys().filter(filterFn(current)).reduce(accumulateHistoryCount, 0) ??
      0
    );
  };

  const stackedCountExceptCurrent = () => {
    if (accumulateType() === 'DAILY') return 0;

    const filterFn =
      accumulateType() === 'WEEKLY'
        ? filterWeekHistory
        : accumulateType() === 'MONTHLY'
        ? filterMonthHistory
        : filterYearHistory;

    return (
      historys()
        .filter((it) => {
          return (
            filterFn(current)(it) &&
            dateFormat['yyyy-MM-dd'](it.date) !==
              dateFormat['yyyy-MM-dd'](current())
          );
        })
        .reduce(accumulateHistoryCount, 0) ?? 0
    );
  };

  const getChallengeResult = (count: Nullable<number>) => {
    if (count === null) return null;
    if (type() === 'OVER' && count >= targetCount()) return true;
    if (type() === 'UNDER' && count <= targetCount()) return true;
    return false;
  };

  const serverChallengeResult = () =>
    getChallengeResult(
      typeof currentHistory()?.count !== 'number' ? null : stackedCount()
    );

  const overValue = () => Math.min((stackedCount() / targetCount()) * 100, 100);

  const unsafetyUnderValue = () =>
    ((targetCount() - stackedCount()) / targetCount()) * 100;

  const safetyUnderValue = () => Math.max(unsafetyUnderValue(), 0);

  const pieChartValue = () =>
    type() === 'OVER' ? overValue() : safetyUnderValue();

  return (
    <FlowItemColorContext.Provider value={color()}>
      <FlowItemComponent.Wrapper onClick={open}>
        <FlowItemComponent.StatusBg
          isFill={() => (currentHistory()?.count ?? null) !== null}
          isPale={() => serverChallengeResult() === false}
        />

        <FlowItemComponent.Content>
          <TypeLabel
            type={type()}
            isCompleted={serverChallengeResult}
            color={color}
          />
          <FlowItemComponent.Main>
            <FlowItemComponent.Name isWhite={serverChallengeResult()}>
              {name()}
            </FlowItemComponent.Name>
            <div class={scaling() ? 'scaling' : undefined}>
              <Show
                when={type() === 'UNDER' && unsafetyUnderValue() < 0}
                fallback={
                  <PieChart
                    percentage={pieChartValue}
                    color={color}
                    complete={serverChallengeResult}
                  />
                }
              >
                <X
                  className={FLOW_STROKE_200[color()]}
                  size={24}
                  strokeWidth={3}
                />
              </Show>
            </div>
          </FlowItemComponent.Main>
        </FlowItemComponent.Content>
        {isBluredPanelShow() && (
          <CTAPanel
            close={close}
            type={type}
            accumulateType={accumulateType}
            stackedCountExceptCurrent={stackedCountExceptCurrent}
            targetCount={targetCount}
            currentHistory={currentHistory}
            color={color}
            onCTA={handleClickCTA}
          />
        )}
      </FlowItemComponent.Wrapper>
    </FlowItemColorContext.Provider>
  );
};

type CTAPanelProps = {
  close: () => void;

  type: Accessor<FlowType>;
  accumulateType: Accessor<FlowIntervalType>;
  stackedCountExceptCurrent: Accessor<number>;
  targetCount: Accessor<number>;
  color: Accessor<FlowColor>;
  currentHistory: Accessor<HistoryType.GetHistoryResponseItem | undefined>;

  onCTA: (count: string) => void;
};

const CTAPanel: Component<CTAPanelProps> = (props) => {
  const [value, setValue] = createSignal('');

  const valueToCount = () => (value() ? Number(value()) : null);

  const ctaIndicatorHeight = () => {
    const height = Math.min(
      ((props.stackedCountExceptCurrent() + (valueToCount() ?? 0)) /
        props.targetCount()) *
        100,
      100
    );

    if (props.type() === 'OVER') return height;

    return 100 - height;
  };

  const ctaIcon = () => {
    if (value().length === 0) return Loader;

    if (props.type() === 'UNDER') {
      if (
        props.stackedCountExceptCurrent() + (valueToCount() ?? 0) >
        props.targetCount()
      )
        return X;
    }

    return Check;
  };

  createEffect(() => {
    setValue(props.currentHistory()?.count?.toString() ?? '');
  });

  return (
    <Panel.Blured autoClose={false} close={props.close}>
      {(close) => (
        <div class='w-full h-full flex flex-col items-center justify-center relative touch-none'>
          <Panel.CloseButton onClick={close} />

          <p class='text-[24px] text-slate-600 mb-4 font-semibold'>
            {props.accumulateType() !== 'DAILY' && (
              <>
                {(
                  props.stackedCountExceptCurrent() + (valueToCount() ?? 0)
                ).toLocaleString()}{' '}
                /{' '}
              </>
            )}
            {props.targetCount().toLocaleString()}
          </p>

          <input
            id='count'
            type='number'
            pattern='[0-9]*'
            inputmode='numeric'
            class='text-center text-[64px] text-slate-800 font-semibold mb-8 placeholder:text-gray-400'
            placeholder='Current'
            value={value()}
            onInput={(e) => setValue(e.target.value.trim())}
          />

          <button
            class={clsx(
              'p-5 rounded-[42%] transition-all relative overflow-hidden active:scale-90 shadow-[0_0_30px_16px_rgba(255,255,255,0.25)]',
              FLOW_BG_300[props.color()]
            )}
            onClick={() => {
              close();
              props.onCTA(value());
            }}
          >
            <div
              class={clsx(
                'absolute left-0 right-0 bottom-0 pointer-events-none transition-all z-0',
                FLOW_BG_500[props.color()]
              )}
              style={{
                height: `${ctaIndicatorHeight()}%`,
              }}
            />

            <div class='z-1 relative'>{ctaIcon()({ size: 40 })}</div>
          </button>
        </div>
      )}
    </Panel.Blured>
  );
};
