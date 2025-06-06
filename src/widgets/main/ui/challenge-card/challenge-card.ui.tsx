import { clsx } from 'clsx';
import { Accessor, Component, For, Match, Switch } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { ChallengeItem, NoChallengeItem } from '~/features/main/ui';
import { CHALLENGE_100_BG_COLOR, CHALLENGE_BG_COLOR } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import { toast } from '~/shared/lib';
import {
  ChallengeColor,
  ChallengeItem as ChallengeItemType,
  CompleteChallengeItem,
  CountableChallengeItem,
  Nullable,
} from '~/shared/model';
import { ChartLine, Menu } from '~/shared/ui';
import { AnalyticsPanel } from '~/widgets/analytics/ui';
import { ChallengeEditPanel } from '~/widgets/challenge-edit/ui';

type Props = {
  title: Accessor<string>;
  color: Accessor<ChallengeColor>;
  challengeItems: Accessor<(ChallengeItemType & { id: number })[]>;
  onChangeCompleteItem: (
    challengeItemId: number,
    isCompleted: Nullable<boolean>
  ) => void;
  onChangeCountableItem: (
    challengeItemId: number,
    count: Nullable<number>
  ) => void;
  originalChallengeItemCount: Accessor<number>;
};

export const ChallengeCard: Component<Props> = (props) => {
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

  const topClassName = () =>
    clsx(
      'pl-4 pr-3 py-2 flex items-center justify-between',
      CHALLENGE_BG_COLOR[props.color()]
    );

  const topButtonClassName =
    'p-1 rounded-[35%] transition-all active:bg-[#FFFFFF30] active:scale-90';

  const itemsContainerClassName = () =>
    clsx('p-2 flex flex-col gap-3', CHALLENGE_100_BG_COLOR[props.color()]);

  const handleChangeComplete = (id: number, isCompleted: Nullable<boolean>) =>
    props.onChangeCompleteItem(id, isCompleted);

  const handleChangeCountable = (id: number, count: Nullable<number>) =>
    props.onChangeCountableItem(id, count);

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
        <For each={props.challengeItems()}>
          {(challengeItem) => {
            return (
              <Switch>
                <Match when={challengeItem.type === 'complete'}>
                  <ChallengeItem.Complete
                    {...(challengeItem as CompleteChallengeItem)}
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
                      handleChangeComplete(challengeItem.id, isCompleted);
                    }}
                  />
                </Match>
                <Match when={challengeItem.type !== 'complete'}>
                  <ChallengeItem.Countable
                    {...(challengeItem as CountableChallengeItem)}
                    onChange={(count) => {
                      const result = (() => {
                        const { type, targetCount } =
                          challengeItem as CountableChallengeItem;

                        if (count === null) return null;

                        if (type === 'over' && count >= targetCount)
                          return true;
                        if (type === 'under' && count <= targetCount)
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

                      handleChangeCountable(challengeItem.id, count);
                    }}
                  />
                </Match>
              </Switch>
            );
          }}
        </For>
        {props.challengeItems().length === 0 &&
          props.originalChallengeItemCount() === 0 && (
            <NoChallengeItem
              color={() => props.color()}
              onClick={() => {
                newChallengeItemPanelOpen = true;
                openChallengeEditPanel();
              }}
            />
          )}
        {props.challengeItems().length === 0 &&
          props.originalChallengeItemCount() !== 0 && (
            <NoChallengeItem.Today color={() => props.color()} />
          )}
      </div>

      {isChallengeEditPanel() && (
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
      )}
    </div>
  );
};
