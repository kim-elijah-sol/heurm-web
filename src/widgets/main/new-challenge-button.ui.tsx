import { createBoolean } from '~/shared/hook';
import { Plus } from '~/shared/ui';
import { NewChallengePanel } from '~/widgets/new-challenge';
import './new-challenge-button.css';

export const NewChallengeButton = () => {
  const [isNewChallengePanel, open, close] = createBoolean();

  return (
    <>
      <div class='flex justify-center'>
        <button
          class='p-3 rounded-[42%] transition-all active:scale-90 heurm-new-challenge-button'
          onClick={open}
        >
          <Plus size={32} />
        </button>
      </div>
      {isNewChallengePanel() && <NewChallengePanel close={close} />}
    </>
  );
};
