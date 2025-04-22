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
        {
          color => (
            <ChallengeCard title='💪 health' color={color} />
          )
        }
      </For>
    </div>
  );
}

export default Main;
