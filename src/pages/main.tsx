import { For } from 'solid-js';
import { mainQueries } from '~/entities/main';
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

  const challenge = mainQueries.challengeQuery();

  return (
    <>
      <div class='p-4 flex flex-col gap-4'>
        <MainTop />
        <DateSelect />
        <Overview />

        {challenge.isPending ? (
          <></>
        ) : challenge.data!.length !== 0 ? (
          <div class='flex flex-col gap-4 mb-2'>
            <For each={challenge.data}>
              {(challenge) => (
                <ChallengeCard
                  id={() => challenge.id}
                  title={() => challenge.title}
                  color={() => challenge.color}
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
