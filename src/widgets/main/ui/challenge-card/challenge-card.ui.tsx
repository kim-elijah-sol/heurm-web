import { clsx } from 'clsx';
import { For, Match, Switch } from 'solid-js';
import { ChallengeItem, NoChallengeItem } from '~/features/main/ui';
import { CHALLENGE_100_BG_COLOR, CHALLENGE_BG_COLOR } from '~/shared/constant';
import { createBoolean } from '~/shared/hook';
import {
  ChallengeColor,
  ChallengeItemType,
  CompleteChallengeItemType,
  CountableChallengeItemType,
} from '~/shared/model';
import { Menu } from '~/shared/ui';
import { ChallengeEditPanel } from '~/widgets/challenge-edit/ui';

type Props = {
  title: string;
  color: ChallengeColor;
  challengeItems: (ChallengeItemType & { id: number })[];
  onChangeCompleteItem: (
    challengeItemId: number,
    isCompleted: boolean | null
  ) => void;
  onChangeCountableItem: (
    challengeItemId: number,
    count: number | null
  ) => void;
};

export const ChallengeCard = (props: Props) => {
  const [isChallengeEditPanel, open, _close] = createBoolean();

  const close = () => {
    newChallengeItemPanelOpen = false;
    _close();
  };

  let newChallengeItemPanelOpen = false;

  const color = () => props.color;

  const topClassName = () =>
    clsx(
      'pl-4 pr-3 py-2 flex items-center justify-between',
      CHALLENGE_BG_COLOR[color()]
    );

  const itemsContainerClassName = () =>
    clsx('p-2 flex flex-col gap-3', CHALLENGE_100_BG_COLOR[color()]);

  const handleChangeComplete = (id: number, isCompleted: boolean | null) =>
    props.onChangeCompleteItem(id, isCompleted);

  const handleChangeCountable = (id: number, count: number | null) =>
    props.onChangeCountableItem(id, count);

  return (
    <div class='overflow-hidden rounded-xl'>
      <div class={topClassName()}>
        <p class='font-semibold text-white'>{props.title}</p>
        <button
          class='p-1 rounded-[35%] transition-all active:bg-[#FFFFFF30] active:scale-90'
          onClick={open}
        >
          <Menu />
        </button>
        {isChallengeEditPanel() && (
          <ChallengeEditPanel
            title={props.title}
            color={color()}
            close={close}
            challengeItems={props.challengeItems}
            newChallengeItemPanelOpen={newChallengeItemPanelOpen}
          />
        )}
      </div>
      <div class={itemsContainerClassName()}>
        <For each={props.challengeItems}>
          {(challengeItem) => {
            return (
              <Switch>
                <Match when={challengeItem.type === 'complete'}>
                  <ChallengeItem.Complete
                    {...(challengeItem as CompleteChallengeItemType)}
                    onChange={(isCompleted) =>
                      handleChangeComplete(challengeItem.id, isCompleted)
                    }
                  />
                </Match>
                <Match when={challengeItem.type !== 'complete'}>
                  <ChallengeItem.Countable
                    {...(challengeItem as CountableChallengeItemType)}
                    onChange={(count) =>
                      handleChangeCountable(challengeItem.id, count)
                    }
                  />
                </Match>
              </Switch>
            );
          }}
        </For>
        {props.challengeItems.length === 0 && (
          <NoChallengeItem
            color={color()}
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
