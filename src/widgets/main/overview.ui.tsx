import { format } from 'date-fns';
import { mainQueries } from '~/entities/main';
import { createDateSelect } from '~/features/main/hook';
import {
  InProgressCard,
  MotivationCard,
  OverviewCard,
} from '~/features/main/ui';

export const Overview = () => {
  const { current } = createDateSelect();

  const challengeOverview = mainQueries.getChallengeOverviewQuery(() => ({
    date: format(current(), 'yyyy-MM-dd'),
  }));

  return (
    <div class='mb-3'>
      <div class='flex gap-3 mb-3'>
        <InProgressCard count={() => challengeOverview.data?.inProgress ?? 0} />
        <MotivationCard />
      </div>
      <div class='flex gap-3'>
        <OverviewCard
          type='win'
          count={() => challengeOverview.data?.win ?? 0}
        />
        <OverviewCard
          type='lose'
          count={() => challengeOverview.data?.lose ?? 0}
        />
      </div>
    </div>
  );
};
