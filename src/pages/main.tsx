import { For } from 'solid-js';
import { useChallenges } from '~/features/main/hook';
import {
  ChallengeCard,
  DateSelect,
  Footer,
  MainTop,
  NewChallengeButton,
  NoChallenge,
  Overview,
} from '~/widgets/main/ui';

function Main() {
  const { challenges, handleChangeComplete, handleChangeCountable } =
    useChallenges;

  return (
    <>
      <div class='p-4 flex flex-col gap-4'>
        <MainTop />
        <DateSelect />
        <Overview />

        {challenges().length !== 0 ? (
          <div class='flex flex-col gap-4 mb-2'>
            <For each={challenges()}>
              {(challenge) => (
                <ChallengeCard
                  title={() => challenge.title}
                  color={() => challenge.color}
                  challengeItems={() => challenge.challengeItems}
                  onChangeCompleteItem={handleChangeComplete(challenge.id)}
                  onChangeCountableItem={handleChangeCountable(challenge.id)}
                  originalChallengeItemCount={() =>
                    challenge.originalChallengeItemCount
                  }
                />
              )}
            </For>
          </div>
        ) : (
          <NoChallenge />
        )}

        <NewChallengeButton />
      </div>
      <Footer />
    </>
  );
}

export default Main;
1;
