import { clsx } from 'clsx';
import { For, Match, Switch, type Accessor, type Component } from 'solid-js';
import { challengeEditQueries } from '~/entities/challenge-edit';
import { mainConstant, mainQueries } from '~/entities/main';
import { getMidnight } from '~/features/main/fx';
import { createDateSelect } from '~/features/main/hook';
import { ChallengeItem, NoChallengeItem } from '~/features/main/ui';
import { CHALLENGE_100_BG_COLOR, CHALLENGE_BG_COLOR } from '~/shared/constant';
import { getRandomItem } from '~/shared/fx';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import type { ChallengeColor } from '~/shared/types';
import { ChartLine, Menu } from '~/shared/ui';
import { ChallengeEditPanel } from '~/widgets/challenge-edit';

type Props = {
  id: Accessor<string>;
  title: Accessor<string>;
  color: Accessor<ChallengeColor>;
};

export const ChallengeCard: Component<Props> = (props) => {
  const { current } = createDateSelect();

  const [
    isChallengeEditPanel,
    openChallengeEditPanel,
    _closeChallengeEditPanel,
  ] = createBoolean();

  const [isAnalycisPanel, openAnalycisPanel, closeAnalycisPanel] =
    createBoolean();

  const closeChallengeEditPanel = () => {
    newChallengeItemPanelOpen = false;
    _closeChallengeEditPanel();
  };

  let newChallengeItemPanelOpen = false;

  const challengeItem = challengeEditQueries.getChallengeItemQuery(() => ({
    challengeId: props.id(),
  }));

  const postHistory = mainQueries.postHistoryMutation(() => {
    //
  });

  const patchHistory = mainQueries.patchHistoryMutation(() => {
    //
  });

  const topClassName = () =>
    clsx(
      'pl-4 pr-3 py-2 flex items-center justify-between',
      CHALLENGE_BG_COLOR[props.color()]
    );

  const topButtonClassName =
    'p-1 rounded-[42%] transition-all active:bg-[#FFFFFF30] active:scale-90';

  const itemsContainerClassName = () =>
    clsx(
      'px-2 py-3 flex flex-col gap-3',
      CHALLENGE_100_BG_COLOR[props.color()]
    );

  const getWinWriting = () => getRandomItem(mainConstant.WIN_WRITING);

  const getLoseWriting = () => getRandomItem(mainConstant.LOSE_WRITING);

  const totalCount = () => challengeItem.data?.length ?? 0;

  const today = getMidnight().valueOf();

  const ONE_DAY = 86_400_000;

  const todayChallengeItems = () =>
    challengeItem.data?.filter((it) => {
      const startAt = getMidnight(it.startAt).valueOf();

      if (today < startAt) return false;
      if (it.endAt && today > getMidnight(it.endAt).valueOf()) return false;

      if (it.intervalType === 'DAILY') {
        if (it.repeat && it.rest) {
          const repeatTerm = ONE_DAY * it.repeat;

          const restTerm = ONE_DAY * it.rest;

          const totalTerm = repeatTerm + restTerm;

          if ((today - startAt) % totalTerm >= repeatTerm) return false;
        } else if (it.repeat) {
          const repeatTerm = ONE_DAY * it.repeat;

          if ((today - startAt) % repeatTerm !== 0) return false;
        }
      } else if (it.intervalType === 'WEEKLY') {
        const startAtDay = new Date(startAt).getDay();
        const startWeekFirstDate = new Date(
          startAt - startAtDay * ONE_DAY
        ).valueOf();

        const todayDay = new Date(today).getDay();
        const thisWeekFirstDate = new Date(
          today - todayDay * ONE_DAY
        ).valueOf();

        const ONE_WEEK = ONE_DAY * 7;

        const repeatTerm = ONE_WEEK * (it.repeat ?? 0);

        if (it.repeat && it.rest) {
          const restTerm = ONE_WEEK * it.rest;

          const totalTerm = repeatTerm + restTerm;

          if (
            (thisWeekFirstDate - startWeekFirstDate) % totalTerm >=
            repeatTerm
          )
            return false;
        } else if (it.repeat) {
          if ((thisWeekFirstDate - startWeekFirstDate) % repeatTerm !== 0)
            return false;
        }
      }

      return true;
    }) ?? [];

  return (
    <div class='overflow-hidden rounded-2xl'>
      <div class={topClassName()}>
        <p class='font-semibold text-white'>{props.title()}</p>
        <div class='flex gap-[6px]'>
          <button class={topButtonClassName} onClick={openAnalycisPanel}>
            <ChartLine />
          </button>
          <button class={topButtonClassName} onClick={openChallengeEditPanel}>
            <Menu />
          </button>
        </div>
      </div>
      <div class={itemsContainerClassName()}>
        <For each={todayChallengeItems()}>
          {(challengeItem) => {
            return (
              <Switch>
                <Match when={challengeItem.type === 'COMPLETE'}>
                  <ChallengeItem.Complete
                    name={challengeItem.name}
                    isCompleted={null}
                    onChange={(isCompleted) => {
                      if (isCompleted === true) {
                        toast.open(
                          `🎉 great! '${
                            challengeItem.name
                          }' challenge is complete!<br/>${getWinWriting()}`
                        );
                      } else if (isCompleted === false) {
                        toast.open(getLoseWriting());
                      }

                      // if (challengeItem.history === null) {
                      //   postHistory.mutate({
                      //     challengeId: props.id(),
                      //     challengeItemId: challengeItem.id,
                      //     date: format(current(), 'yyyy-MM-dd'),
                      //     complete: isCompleted,
                      //   });
                      // } else {
                      //   patchHistory.mutate({
                      //     challengeId: props.id(),
                      //     challengeItemId: challengeItem.id,
                      //     id: challengeItem.history.id,
                      //     complete: isCompleted,
                      //   });
                      // }
                    }}
                  />
                </Match>
                <Match when={challengeItem.type !== 'COMPLETE'}>
                  <ChallengeItem.Countable
                    name={challengeItem.name}
                    targetCount={challengeItem.targetCount!}
                    count={null}
                    type={challengeItem.type as 'OVER' | 'UNDER'}
                    onChange={(count) => {
                      const targetCount = challengeItem.targetCount!;

                      const result = (() => {
                        const { type } = challengeItem as {
                          type: 'OVER' | 'UNDER';
                          targetCount: number;
                        };

                        if (count === null) return null;

                        if (type === 'OVER' && count >= targetCount)
                          return true;
                        if (type === 'UNDER' && count <= targetCount)
                          return true;

                        return false;
                      })();

                      if (result === true) {
                        toast.open(
                          `🎉 great! '${
                            challengeItem.name
                          }' challenge is complete!<br/>${getWinWriting()}`
                        );
                      } else if (result === false) {
                        toast.open(getLoseWriting());
                      }

                      // if (challengeItem.history === null) {
                      //   postHistory.mutate({
                      //     challengeId: props.id(),
                      //     challengeItemId: challengeItem.id,
                      //     date: format(current(), 'yyyy-MM-dd'),
                      //     count,
                      //     targetCount,
                      //   });
                      // } else {
                      //   patchHistory.mutate({
                      //     challengeId: props.id(),
                      //     challengeItemId: challengeItem.id,
                      //     id: challengeItem.history.id,

                      //     count,
                      //     targetCount,
                      //   });
                      // }
                    }}
                  />
                </Match>
              </Switch>
            );
          }}
        </For>
        {totalCount() === 0 && (
          <NoChallengeItem
            color={() => props.color()}
            onClick={() => {
              newChallengeItemPanelOpen = true;
              openChallengeEditPanel();
            }}
          />
        )}
        {/*}
        {challengeItemByDate.data?.todayChallengeItems.length === 0 &&
          challengeItemByDate.data?.originalChallengeItems.length !== 0 && (
            <NoChallengeItem.Today color={() => props.color()} />
          )} */}
      </div>

      {isChallengeEditPanel() && (
        <ChallengeEditPanel
          challengeId={props.id}
          title={props.title}
          color={props.color}
          close={closeChallengeEditPanel}
          newChallengeItemPanelOpen={newChallengeItemPanelOpen}
        />
      )}

      {/* {isAnalycisPanel() && (
        <AnalyticsPanel
          title={props.title}
          color={props.color}
          close={closeAnalycisPanel}
          challengeItems={props.challengeItems}
        />
      )} */}
    </div>
  );
};
