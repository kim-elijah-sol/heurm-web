import clsx from 'clsx';
import { format } from 'date-fns';
import {
  createEffect,
  createSignal,
  type Accessor,
  type Component,
} from 'solid-js';
import { mainQueries } from '~/entities/main';
import {
  CHALLENGE_300_BG_COLOR,
  CHALLENGE_BG_500_COLOR,
  CHALLENGE_TEXT_COLOR_300,
  CHALLENGE_TEXT_COLOR_500,
} from '~/shared/constant';
import { dateFormat } from '~/shared/fx';
import { createBoolean } from '~/shared/hook';
import type {
  ChallengeColor,
  ChallengeItemIntervalType,
  Nullable,
} from '~/shared/types';
import { Check, Loader, Panel } from '~/shared/ui';
import {
  accumulateHistoryCount,
  filterMonthHistory,
  filterWeekHistory,
  filterYearHistory,
} from '../../fx';
import { createDateSelect } from '../../hook';
import { PieChart } from './pie-chart.ui';
import './result-scaling.ui.css';

type Props = {
  type: Accessor<'OVER' | 'UNDER'>;
  name: Accessor<string>;
  targetCount: Accessor<number>;
  challengeId: Accessor<string>;
  challengeItemId: Accessor<string>;
  color: Accessor<ChallengeColor>;
  accumulateType: Accessor<Nullable<ChallengeItemIntervalType>>;
};

export const Countable: Component<Props> = (props) => {
  const { current } = createDateSelect();

  const type = () => props.type();

  const name = () => props.name();

  const targetCount = () => props.targetCount();

  const accumulateType = () => props.accumulateType() ?? 'DAILY';

  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  const [scaling, animStart, animEnd] = createBoolean();

  const [value, setValue] = createSignal('');

  const getHistory = mainQueries.getHistoryQuery(() => ({
    challengeId: props.challengeId(),
    challengeItemId: props.challengeItemId(),
  }));

  const currentHistory = () =>
    getHistory.data?.find(
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
      getHistory.data
        ?.filter(filterFn(current))
        .reduce(accumulateHistoryCount, 0) ?? 0
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
      getHistory.data
        ?.filter((it) => {
          return (
            filterFn(current)(it) &&
            dateFormat['yyyy-MM-dd'](it.date) !==
              dateFormat['yyyy-MM-dd'](current())
          );
        })
        .reduce(accumulateHistoryCount, 0) ?? 0
    );
  };

  const postHistory = mainQueries.postHistoryMutation(() =>
    getHistory.refetch()
  );

  const patchHistory = mainQueries.patchHistoryMutation(() =>
    getHistory.refetch()
  );

  const handleClickCTA = async () => {
    const count = value().trim().length ? Number(value()) : null;

    if (currentHistory()) {
      await patchHistory.mutateAsync({
        id: currentHistory()!.id,
        challengeId: props.challengeId(),
        challengeItemId: props.challengeItemId(),
        count,
      });
    } else {
      await postHistory.mutateAsync({
        challengeId: props.challengeId(),
        challengeItemId: props.challengeItemId(),
        type: props.type(),
        count,
        date: format(current(), 'yyyy-MM-dd'),
      });
    }

    animStart();
    setTimeout(() => {
      animEnd();
    }, 350);
  };

  const getChallengeResult = (count: Nullable<number>) => {
    if (count === null) return null;
    if (type() === 'OVER' && count >= targetCount()) return true;
    if (type() === 'UNDER' && count <= targetCount()) return true;
    return false;
  };

  const valueToCount = () => (value() ? Number(value()) : null);

  const serverChallengeResult = () =>
    getChallengeResult(
      typeof currentHistory()?.count !== 'number' ? null : stackedCount()
    );

  const ctaIndicatorHeight = () =>
    Math.min(
      ((stackedCountExceptCurrent() + (valueToCount() ?? 0)) / targetCount()) *
        100,
      100
    );

  const ctaIcon = () => (value().length === 0 ? Loader : Check);

  const nameTextClass = () =>
    serverChallengeResult() === null
      ? 'text-gray-400 font-semibold'
      : serverChallengeResult()
      ? clsx('font-bold', CHALLENGE_TEXT_COLOR_500[props.color()])
      : clsx('font-semibold', CHALLENGE_TEXT_COLOR_300[props.color()]);

  createEffect(() => {
    if (isBluredPanelShow()) {
      setValue(currentHistory()?.count?.toString() ?? '');
    }
  });

  const percentage = () => stackedCount() / targetCount();

  return (
    <>
      <div
        class='p-2 rounded-xl transition-all active:scale-[0.98] active:bg-[rgb(255,255,255,0.6)] flex items-center justify-between'
        onClick={() => setIsBluredPanelShow(true)}
      >
        <p class={nameTextClass()}>{name()}</p>

        <div class={scaling() ? 'scaling' : undefined}>
          <PieChart percentage={percentage} color={props.color} />
        </div>
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
                {targetCount().toLocaleString()}
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
                  'p-5 rounded-[42%] transition-all relative overflow-hidden active:scale-90',
                  CHALLENGE_300_BG_COLOR[props.color()]
                )}
                onClick={() => {
                  handleClickCTA();
                  close();
                }}
              >
                <div
                  class={clsx(
                    'absolute left-0 right-0 bottom-0 pointer-events-none transition-all z-0',
                    CHALLENGE_BG_500_COLOR[props.color()]
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
      )}
    </>
  );
};
