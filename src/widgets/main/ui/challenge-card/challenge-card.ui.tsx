import { clsx } from 'clsx';
import { For, Match, Switch } from 'solid-js';
import {
  ChallengeItemType,
  CHALLENGE_100_BG_COLOR,
  CHALLENGE_BG_COLOR,
  CHALLENGE_COLOR,
} from '~/entities/main';
import { getChallengeItemResult } from '~/features/main';

type Props = {
  title: string;
  color: (typeof CHALLENGE_COLOR)[number];
  challengeItems: ChallengeItemType[];
};

export const ChallengeCard = (props: Props) => {
  const topClassName = () => clsx('px-4 py-2', CHALLENGE_BG_COLOR[props.color]);

  const itemsContainerClassName = () =>
    clsx('p-2 flex flex-col gap-3', CHALLENGE_100_BG_COLOR[props.color]);

  const itemClassName = () =>
    clsx(
      'p-2 rounded-xl transition-all active:scale-[0.98] active:bg-[rgb(255,255,255,0.6)] flex items-center justify-between'
    );

  return (
    <div class='overflow-hidden rounded-xl'>
      <div class={topClassName()}>
        <p class='font-semibold text-white'>{props.title}</p>
      </div>
      <div class={itemsContainerClassName()}>
        <For each={props.challengeItems}>
          {(challengeItem) => {
            const challengeItemResult = getChallengeItemResult(challengeItem);

            return (
              <div class={itemClassName()}>
                <p class='font-medium'>{challengeItem.name}</p>

                <p class='w-6 text-center'>
                  <Switch>
                    <Match when={challengeItemResult === 'progress'}>⏳</Match>
                    <Match when={challengeItemResult === 'win'}>🎉</Match>
                    <Match when={challengeItemResult === 'fail'}>❌</Match>
                  </Switch>
                </p>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};
