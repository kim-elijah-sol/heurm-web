import { clsx } from 'clsx';
import { format } from 'date-fns';
import { For, Match, Switch, type Accessor, type Component } from 'solid-js';
import { mainConstant, mainQueries } from '~/entities/main';
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

  const challengeItemByDate = mainQueries.getChallengeItemByDateQuery(() => ({
    challengeId: props.id(),
    date: format(current(), 'yyyy-MM-dd'),
  }));

  const postHistory = mainQueries.postHistoryMutation(() => {
    challengeItemByDate.refetch();
  });

  const topClassName = () =>
    clsx(
      'pl-4 pr-3 py-2 flex items-center justify-between',
      CHALLENGE_BG_COLOR[props.color()]
    );

  const topButtonClassName =
    'p-1 rounded-[35%] transition-all active:bg-[#FFFFFF30] active:scale-90';

  const itemsContainerClassName = () =>
    clsx('p-2 flex flex-col gap-3', CHALLENGE_100_BG_COLOR[props.color()]);

  const getWinWriting = () => getRandomItem(mainConstant.WIN_WRITING);

  const getLoseWriting = () => getRandomItem(mainConstant.LOSE_WRITING);

  return (
    <div class='overflow-hidden rounded-xl'>
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
        <For each={challengeItemByDate.data?.todayChallengeItems ?? []}>
          {(challengeItem) => {
            return (
              <Switch>
                <Match when={challengeItem.type === 'COMPLETE'}>
                  <ChallengeItem.Complete
                    name={challengeItem.name}
                    isCompleted={challengeItem.history?.complete ?? null}
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

                      postHistory.mutate({
                        challengeId: props.id(),
                        challengeItemId: challengeItem.id,
                        date: format(current(), 'yyyy-MM-dd'),
                        complete: isCompleted,
                      });
                    }}
                  />
                </Match>
                <Match when={challengeItem.type !== 'COMPLETE'}>
                  <ChallengeItem.Countable
                    name={challengeItem.name}
                    targetCount={
                      challengeItem.history?.targetCount ??
                      challengeItem.targetCount!
                    }
                    count={challengeItem.history?.count ?? null}
                    type={challengeItem.type as 'OVER' | 'UNDER'}
                    onChange={(count) => {
                      const targetCount =
                        challengeItem.history?.targetCount ??
                        challengeItem.targetCount!;

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

                      postHistory.mutate({
                        challengeId: props.id(),
                        challengeItemId: challengeItem.id,
                        date: format(current(), 'yyyy-MM-dd'),
                        count,
                        targetCount,
                      });
                    }}
                  />
                </Match>
              </Switch>
            );
          }}
        </For>
        {challengeItemByDate.data?.todayChallengeItems.length === 0 &&
          challengeItemByDate.data?.originalChallengeItems.length === 0 && (
            <NoChallengeItem
              color={() => props.color()}
              onClick={() => {
                newChallengeItemPanelOpen = true;
                openChallengeEditPanel();
              }}
            />
          )}
        {challengeItemByDate.data?.todayChallengeItems.length === 0 &&
          challengeItemByDate.data?.originalChallengeItems.length !== 0 && (
            <NoChallengeItem.Today color={() => props.color()} />
          )}
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
