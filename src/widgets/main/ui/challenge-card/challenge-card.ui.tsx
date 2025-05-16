import { clsx } from 'clsx';
import { Accessor, Component, For, Match, Switch } from 'solid-js';
import { ChallengeItem, NoChallengeItem } from '~/features/main/ui';
import { CHALLENGE_100_BG_COLOR, CHALLENGE_BG_COLOR } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import {
  ChallengeColor,
  ChallengeItem as ChallengeItemType,
  CompleteChallengeItem,
  CountableChallengeItem,
  Nullable,
} from '~/shared/model';
import { ChartLine, Menu } from '~/shared/ui';
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
};

export const ChallengeCard: Component<Props> = (props) => {
  const [
    isChallengeEditPanel,
    openChallengeEditPanel,
    closeChallengeEditPanel,
  ] = createBoolean();

  const close = () => {
    newChallengeItemPanelOpen = false;
    closeChallengeEditPanel();
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
          <button class={topButtonClassName}>
            <ChartLine />
          </button>
          <button class={topButtonClassName} onClick={openChallengeEditPanel}>
            <Menu />
          </button>
        </div>
        {isChallengeEditPanel() && (
          <ChallengeEditPanel
            title={props.title}
            color={props.color}
            close={close}
            challengeItems={props.challengeItems}
            newChallengeItemPanelOpen={newChallengeItemPanelOpen}
          />
        )}
      </div>
      <div class={itemsContainerClassName()}>
        <For each={props.challengeItems()}>
          {(challengeItem) => {
            return (
              <Switch>
                <Match when={challengeItem.type === 'complete'}>
                  <ChallengeItem.Complete
                    {...(challengeItem as CompleteChallengeItem)}
                    onChange={(isCompleted) =>
                      handleChangeComplete(challengeItem.id, isCompleted)
                    }
                  />
                </Match>
                <Match when={challengeItem.type !== 'complete'}>
                  <ChallengeItem.Countable
                    {...(challengeItem as CountableChallengeItem)}
                    onChange={(count) =>
                      handleChangeCountable(challengeItem.id, count)
                    }
                  />
                </Match>
              </Switch>
            );
          }}
        </For>
        {props.challengeItems().length === 0 && (
          <NoChallengeItem
            color={() => props.color()}
            onClick={() => {
              newChallengeItemPanelOpen = true;
              open();
            }}
          />
        )}
      </div>
    </div>
  );
};
