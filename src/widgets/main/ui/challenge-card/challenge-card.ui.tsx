import { clsx } from 'clsx';
import { createSignal, For, Match, Switch } from 'solid-js';
import {
  ChallengeItemType,
  CHALLENGE_100_BG_COLOR,
  CHALLENGE_BG_COLOR,
  CHALLENGE_COLOR,
  CompleteChallengeItemType,
  CountableChallengeItemType,
} from '~/entities/main';
import { ChallengeItem } from '~/features/main';
import { Menu } from '~/shared/ui';
import { ChallengeSlidePanel } from '../challenge-slide-panel';

type Props = {
  title: string;
  color: (typeof CHALLENGE_COLOR)[number];
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
  const [isSlidePanelShow, setIsSlidePanelShow] = createSignal(false);

  const topClassName = () =>
    clsx(
      'pl-4 pr-3 py-2 flex items-center justify-between',
      CHALLENGE_BG_COLOR[props.color]
    );

  const itemsContainerClassName = () =>
    clsx('p-2 flex flex-col gap-3', CHALLENGE_100_BG_COLOR[props.color]);

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
          onClick={() => setIsSlidePanelShow(true)}
        >
          <Menu />
        </button>
        {isSlidePanelShow() && (
          <ChallengeSlidePanel
            title={props.title}
            color={props.color}
            close={() => setIsSlidePanelShow(false)}
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
      </div>
    </div>
  );
};
