import { For } from 'solid-js';
import { useChallenges } from '~/entities/main';
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
          {(challnge) => (
            <ChallengeCard
              {...challnge}
              onChangeCompleteItem={handleChangeComplete(challnge.id)}
              onChangeCountableItem={handleChangeCountable(challnge.id)}
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
