import clsx from 'clsx';
import { format } from 'date-fns';
import {
  createEffect,
  createSignal,
  type Accessor,
  type Component,
} from 'solid-js';
import { mainQueries } from '~/entities/main';
import { dateFormat } from '~/shared/fx';
import type {
  ChallengeColor,
  ChallengeItemIntervalType,
  Nullable,
} from '~/shared/types';
import { Ban, Check, Loader, Panel } from '~/shared/ui';
import { createDateSelect } from '../../hook';
import { PieChart } from './pie-chart.ui';

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

  const [value, setValue] = createSignal('');

  const getHistory = mainQueries.getHistoryQuery(() => ({
    challengeId: props.challengeId(),
    challengeItemId: props.challengeItemId(),
  }));

  const currentHistory = () =>
    getHistory.data?.find(
      (it) => format(it.date, 'yyyy.MM.dd') === format(current(), 'yyyy.MM.dd')
    );

  const getDateValue = (date: number | string | Date) => {
    return Number(dateFormat['yyyy-MM-dd'](date).replace(/-/g, ''));
  };

  const stackedCount = () => {
    if (accumulateType() === 'DAILY') return currentHistory()?.count ?? 0;
    if (accumulateType() === 'WEEKLY') {
      const ONE_DAY = 86_400_000;

      const currentDay = new Date(current()).getDay();
      const weekFirstDate = new Date(
        current().valueOf() - currentDay * ONE_DAY
      ).valueOf();

      const weekLastDate = new Date(weekFirstDate + ONE_DAY * 6).valueOf();

      return (
        getHistory.data
          ?.filter(
            (it) =>
              getDateValue(it.date) >= getDateValue(weekFirstDate) &&
              getDateValue(it.date) <= getDateValue(weekLastDate)
          )
          .reduce((acc, current) => {
            return acc + (current.count ?? 0);
          }, 0) ?? 0
      );
    }
    if (accumulateType() === 'MONTHLY') {
      const currentYear = new Date(current()).getFullYear();
      const currentMonth = new Date(current()).getMonth();

      return (
        getHistory.data
          ?.filter((it) => {
            const itYear = new Date(it.date).getFullYear();
            const itMonth = new Date(it.date).getMonth();

            return itYear === currentYear && itMonth === currentMonth;
          })
          .reduce((acc, current) => {
            return acc + (current.count ?? 0);
          }, 0) ?? 0
      );
    }
    if (accumulateType() === 'YEARLY') {
      const currentYear = new Date(current()).getFullYear();

      return (
        getHistory.data
          ?.filter((it) => {
            const itYear = new Date(it.date).getFullYear();

            return itYear === currentYear;
          })
          .reduce((acc, current) => {
            return acc + (current.count ?? 0);
          }, 0) ?? 0
      );
    }

    return 0;
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
  };

  const getChallengeResult = (count: Nullable<number>) => {
    if (count === null) return null;
    if (type() === 'OVER' && count >= targetCount()) return true;
    if (type() === 'UNDER' && count <= targetCount()) return true;
    return false;
  };

  const valueToCount = () => (value() ? Number(value()) : null);

  const serverChallengeResult = () =>
    getChallengeResult(currentHistory()?.count ?? null);

  const localChallengeResult = () => getChallengeResult(valueToCount());

  const icon = () =>
    localChallengeResult()
      ? Check
      : localChallengeResult() === false
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

        <PieChart percentage={percentage} color={props.color} />
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
                onInput={(e) => setValue(e.target.value)}
              />

              <button
                class={clsx(
                  'p-5 rounded-[42%] transition-all active:scale-90',
                  buttonColor()
                )}
                onClick={() => {
                  handleClickCTA();
                  close();
                }}
              >
                {icon()({ size: 40 })}
              </button>
            </div>
          )}
        </Panel.Blured>
      )}
    </>
  );
};
