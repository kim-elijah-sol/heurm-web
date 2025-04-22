import { clsx } from 'clsx';
import { CHALLENGE_BG_COLOR, CHALLENGE_COLOR } from '~/entities/main';

type Props = {
  title: string;
  color: (typeof CHALLENGE_COLOR)[number];
};

export const ChallengeCard = (props: Props) => {
  const topClassName = () => clsx('px-4 py-2', CHALLENGE_BG_COLOR[props.color]);

  return (
    <div class='overflow-hidden rounded-xl'>
      <div class={topClassName()}>
        <p class='font-semibold text-white'>{props.title}</p>
      </div>
    </div>
  );
};
