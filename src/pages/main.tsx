import { For } from 'solid-js';
import { mainQueries } from '~/entities/main';
import {
  ChallengeCard,
  DateSelect,
  Footer,
  MainTop,
  NewFlowButton,
  NoChallenge,
} from '~/widgets/main';

function Main() {
  const getChallengeQuery = mainQueries.getChallengeQuery();

  return (
    <>
      <div class='p-4 flex flex-col gap-4'>
        <MainTop />
        <DateSelect />

        {getChallengeQuery.isPending ? (
          <></>
        ) : getChallengeQuery.data!.length !== 0 ? (
          <div class='flex flex-col gap-4 mb-2'>
            <For each={getChallengeQuery.data}>
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

        <NewFlowButton />
      </div>
      <Footer />
    </>
  );
}

export default Main;
1;
