import { createMemo } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { getRandomItem } from '~/shared/fx';
import './no-challenge.ui.css';

export const NoChallenge = () => {
  const noChallgneWriting = createMemo(() =>
    getRandomItem(mainConstant.NO_CHALLENGE_ITEM_WRITING)
  );

  return (
    <div class='my-6 flex flex-col items-center px-6'>
      <p class='no-challenge text-center font-bold text-2xl'>
        {noChallgneWriting()}
      </p>
    </div>
  );
};
