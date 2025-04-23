import { For } from 'solid-js';
import { CHALLENGE_COLOR } from '~/entities/main';
import { ChallengeCard, DateSelect, MainTop, Overview } from '~/widgets/main';

function Main() {
  return (
    <div class='p-4 flex flex-col gap-4'>
      <MainTop />
      <DateSelect />
      <Overview />

      <For each={CHALLENGE_COLOR}>
        {(color) => (
          <ChallengeCard
            title='💪 health'
            color={color}
            challengeItems={[
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
            ]}
          />
        )}
      </For>
    </div>
  );
}

export default Main;
1;
