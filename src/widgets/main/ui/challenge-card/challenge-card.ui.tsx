import { clsx } from 'clsx';
import { For, Match, Switch } from 'solid-js';
import { createStore } from 'solid-js/store';
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

type Props = {
  title: string;
  color: (typeof CHALLENGE_COLOR)[number];
};

export const ChallengeCard = (props: Props) => {
  const [challengeItems, setChallengeItems] = createStore<ChallengeItemType[]>([
    {
      name: '3km running',
      type: 'complete',
      isCompleted: null,
    },
    {
      name: 'push-up',
      type: 'over',
      targetCount: 72,
      count: null,
    },
    {
      name: '100m sprint',
      type: 'under',
      targetCount: 15,
      count: null,
    },
  ]);

  const topClassName = () =>
    clsx(
      'pl-4 pr-3 py-2 flex items-center justify-between',
      CHALLENGE_BG_COLOR[props.color]
    );

  const itemsContainerClassName = () =>
    clsx('p-2 flex flex-col gap-3', CHALLENGE_100_BG_COLOR[props.color]);

  const handleChangeComplete = (index: number, isCompleted: boolean | null) => {
    setChallengeItems(
      challengeItems.map((it, _index) =>
        _index === index
          ? {
              ...it,
              isCompleted,
            }
          : it
      )
    );
  };

  const handleChangeCountable = (index: number, count: number | null) => {
    setChallengeItems(
      challengeItems.map((it, _index) =>
        _index === index
          ? {
              ...it,
              count,
            }
          : it
      )
    );
  };

  return (
    <div class='overflow-hidden rounded-xl'>
      <div class={topClassName()}>
        <p class='font-semibold text-white'>{props.title}</p>
        <button class='p-1 rounded-[35%] transition-all active:bg-[#FFFFFF30] active:scale-90'>
          <Menu />
        </button>
      </div>
      <div class={itemsContainerClassName()}>
        <For each={challengeItems}>
          {(challengeItem, index) => {
            return (
              <Switch>
                <Match when={challengeItem.type === 'complete'}>
                  <ChallengeItem.Complete
                    {...(challengeItem as CompleteChallengeItemType)}
                    onChange={(isComplete) =>
                      handleChangeComplete(index(), isComplete)
                    }
                  />
                </Match>
                <Match when={challengeItem.type !== 'complete'}>
                  <ChallengeItem.Countable
                    {...(challengeItem as CountableChallengeItemType)}
                    onChange={(count) => handleChangeCountable(index(), count)}
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
