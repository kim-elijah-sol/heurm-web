import { OverviewCard } from '~/features/main';

export const Overview = () => {
  return (
    <div>
      <div class='flex items-center justify-center gap-4'>
        <OverviewCard type='win' count={17} />
        <p>VS</p>
        <OverviewCard type='lose' count={3} />
      </div>
    </div>
  );
};
