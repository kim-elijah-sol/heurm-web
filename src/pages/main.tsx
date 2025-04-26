import { For } from 'solid-js';
import { CHALLENGE_COLOR } from '~/entities/main';
import {
  ChallengeCard,
  DateSelect,
  MainTop,
  NewChallengeButton,
  Overview,
} from '~/widgets/main';

function Main() {
  return (
    <div class='p-4 flex flex-col gap-4'>
      <MainTop />
      <DateSelect />
      <Overview />

      <div class='flex flex-col gap-4 mb-2'>
        <For each={CHALLENGE_COLOR}>
          {(color) => <ChallengeCard title='💪 health' color={color} />}
        </For>
      </div>
      <NewChallengeButton />
    </div>
  );
}

export default Main;
1;
