import { InProgressCard, OverviewCard } from '~/features/main';

export const Overview = () => {
  return (
    <div>
      <div class='flex gap-3 mb-3'>
        <InProgressCard count={5} />
      </div>
      <div class='flex gap-3'>
        <OverviewCard type='win' count={17} />
        <OverviewCard type='lose' count={3} />
      </div>
    </div>
  );
};
