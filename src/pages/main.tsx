import { For } from 'solid-js';
import { useChallenges } from '~/features/main/hook';
import {
  ChallengeCard,
  DateSelect,
  MainTop,
  NewChallengeButton,
  Overview,
} from '~/widgets/main/ui';

function Main() {
  const { challenges, handleChangeComplete, handleChangeCountable } =
    useChallenges;

  return (
    <div class='p-4 flex flex-col gap-4'>
      <MainTop />
      <DateSelect />
      <Overview />

      <div class='flex flex-col gap-4 mb-2'>
        <For each={challenges()}>
          {(challenge) => (
            <ChallengeCard
              {...challenge}
              onChangeCompleteItem={handleChangeComplete(challenge.id)}
              onChangeCountableItem={handleChangeCountable(challenge.id)}
            />
          )}
        </For>
      </div>
      <NewChallengeButton />
    </div>
  );
}

export default Main;
1;
