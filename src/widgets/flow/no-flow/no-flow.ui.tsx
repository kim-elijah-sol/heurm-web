import { createMemo } from 'solid-js';
import { mainConstant } from '~/entities/main';
import { getRandomItem } from '~/shared/fx';
import './no-flow.ui.css';

export const NoFlow = () => {
  const noFlowWriting = createMemo(() =>
    getRandomItem(mainConstant.NO_FLOW_WRITING)
  );

  return (
    <div class='my-6 flex flex-col items-center px-6'>
      <p class='no-flow text-center font-bold text-2xl'>{noFlowWriting()}</p>
    </div>
  );
};
