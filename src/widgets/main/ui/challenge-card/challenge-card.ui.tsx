import { clsx } from 'clsx';
import { format } from 'date-fns';
import { Accessor, Component, For, Match, Switch } from 'solid-js';
import { mainConstant, mainQueries } from '~/entities/main';
import { createDateSelect } from '~/features/main/hook';
import { ChallengeItem, NoChallengeItem } from '~/features/main/ui';
import { CHALLENGE_100_BG_COLOR, CHALLENGE_BG_COLOR } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import { ChallengeColor } from '~/shared/model';
import { ChartLine, Menu } from '~/shared/ui';

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

  const topClassName = () =>
    clsx(
      'pl-4 pr-3 py-2 flex items-center justify-between',
      CHALLENGE_BG_COLOR[props.color()]
    );

  const topButtonClassName =
    'p-1 rounded-[35%] transition-all active:bg-[#FFFFFF30] active:scale-90';

  const itemsContainerClassName = () =>
    clsx('p-2 flex flex-col gap-3', CHALLENGE_100_BG_COLOR[props.color()]);

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
                    isCompleted={
                      challengeItem.history === null
                        ? null
                        : challengeItem.history.complete
                    }
                    onChange={(isCompleted) => {
                      if (isCompleted === true) {
                        const winWriting =
                          mainConstant.WIN_WRITING[
                            Math.floor(
                              Math.random() * mainConstant.WIN_WRITING.length
                            )
                          ];

                        toast.open(
                          `🎉 great! '${challengeItem.name}' challenge is complete!<br/>${winWriting}`
                        );
                      } else if (isCompleted === false) {
                        const loseWriting =
                          mainConstant.LOSE_WRITING[
                            Math.floor(
                              Math.random() * mainConstant.LOSE_WRITING.length
                            )
                          ];

                        toast.open(loseWriting);
                      }
                    }}
                  />
                </Match>
                <Match when={challengeItem.type !== 'COMPLETE'}>
                  <ChallengeItem.Countable
                    name={challengeItem.name}
                    targetCount={challengeItem.targetCount!}
                    count={challengeItem.history?.count ?? null}
                    type={challengeItem.type as 'OVER' | 'UNDER'}
                    onChange={(count) => {
                      const result = (() => {
                        const { type, targetCount } = challengeItem as {
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
                        const winWriting =
                          mainConstant.WIN_WRITING[
                            Math.floor(
                              Math.random() * mainConstant.WIN_WRITING.length
                            )
                          ];

                        toast.open(
                          `🎉 great! '${challengeItem.name}' challenge is complete!<br/>${winWriting}`
                        );
                      } else if (result === false) {
                        const loseWriting =
                          mainConstant.LOSE_WRITING[
                            Math.floor(
                              Math.random() * mainConstant.LOSE_WRITING.length
                            )
                          ];

                        toast.open(loseWriting);
                      }
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

      {/* {isChallengeEditPanel() && (
        <ChallengeEditPanel
          title={props.title}
          color={props.color}
          close={closeChallengeEditPanel}
          challengeItems={props.challengeItems}
          newChallengeItemPanelOpen={newChallengeItemPanelOpen}
        />
      )}

      {isAnalycisPanel() && (
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
