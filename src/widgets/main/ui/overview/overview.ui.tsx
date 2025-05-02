import { useChallenges } from '~/entities/main';
import { InProgressCard, MotivationCard, OverviewCard } from '~/features/main';

export const Overview = () => {
  const {
    progressChallengeItemCount,
    winChallengeItemCount,
    loseChallengeItemCount,
  } = useChallenges;

  return (
    <div class='mb-3'>
      <div class='flex gap-3 mb-3'>
        <InProgressCard count={progressChallengeItemCount()} />
        <MotivationCard />
      </div>
      <div class='flex gap-3'>
        <OverviewCard type='win' count={winChallengeItemCount()} />
        <OverviewCard type='lose' count={loseChallengeItemCount()} />
      </div>
    </div>
  );
};
