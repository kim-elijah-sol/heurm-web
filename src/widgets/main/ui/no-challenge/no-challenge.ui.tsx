import { createMemo } from 'solid-js';
import { mainConstant } from '~/entities/main';
import './no-challenge.ui.css';

export const NoChallenge = () => {
  const noChallgneWriting = createMemo(() => {
    return mainConstant.NO_CHALLENGE_ITEM_WRITING[
      Math.floor(Math.random() * mainConstant.NO_CHALLENGE_ITEM_WRITING.length)
    ];
  });

  return (
    <div class='my-6 flex flex-col items-center px-6'>
      <p class='no-challenge text-center font-bold text-2xl'>
        {noChallgneWriting()}
      </p>
    </div>
  );
};
