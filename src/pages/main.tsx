import { For } from 'solid-js';
import { CHALLENGE_COLOR, useChallenges } from '~/entities/main';
import {
  ChallengeCard,
  DateSelect,
  MainTop,
  NewChallengeButton,
  Overview,
} from '~/widgets/main';

function Main() {
  const { challenges } = useChallenges

  return (
    <div class='p-4 flex flex-col gap-4'>
      <MainTop />
      <DateSelect />
      <Overview />

      <div class='flex flex-col gap-4 mb-2'>
        <For each={challenges()}>
          {(challnge) => <ChallengeCard {...challnge} />}
        </For>
      </div>
      <NewChallengeButton />
    </div>
  );
}

export default Main;
1;
