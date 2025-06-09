import {
  InProgressCard,
  MotivationCard,
  OverviewCard,
} from '~/features/main/ui';

export const Overview = () => {
  return (
    <div class='mb-3'>
      <div class='flex gap-3 mb-3'>
        <InProgressCard count={() => 10} />
        <MotivationCard />
      </div>
      <div class='flex gap-3'>
        <OverviewCard type='win' count={() => 3} />
        <OverviewCard type='lose' count={() => 1} />
      </div>
    </div>
  );
};
