import { clsx } from 'clsx';
import { For, Match, Switch } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  ChallengeItemType,
  CHALLENGE_100_BG_COLOR,
  CHALLENGE_BG_COLOR,
  CHALLENGE_COLOR,
  CompleteChallengeItemType,
} from '~/entities/main';
import { ChallengeItem } from '~/features/main';

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
      name: '3km running',
      type: 'complete',
      isCompleted: true,
    },
    {
      name: '3km running',
      type: 'complete',
      isCompleted: false,
    },
    {
      name: 'push-up',
      type: 'over',
      targetCount: 72,
      count: null,
    },
    {
      name: 'push-up',
      type: 'over',
      targetCount: 72,
      count: 82,
    },
    {
      name: 'push-up',
      type: 'over',
      targetCount: 72,
      count: 71,
    },
    {
      name: '100m sprint',
      type: 'under',
      targetCount: 15,
      count: null,
    },
    {
      name: '100m sprint',
      type: 'under',
      targetCount: 15,
      count: 14,
    },
    {
      name: '100m sprint',
      type: 'under',
      targetCount: 15,
      count: 17,
    },
  ]);

  const topClassName = () => clsx('px-4 py-2', CHALLENGE_BG_COLOR[props.color]);

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

  return (
    <div class='overflow-hidden rounded-xl'>
      <div class={topClassName()}>
        <p class='font-semibold text-white'>{props.title}</p>
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
              </Switch>
            );
          }}
        </For>
      </div>
    </div>
  );
};
