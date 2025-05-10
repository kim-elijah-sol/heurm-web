import { createBoolean } from '~/shared/hook';
import { Plus } from '~/shared/ui';
import { NewChallengePanel } from '~/widgets/new-challenge/ui';
import './new-challenge-button.css';

export const NewChallengeButton = () => {
  const [isNewChallengePanel, open, close] = createBoolean();

  return (
    <>
      <div class='flex justify-center'>
        <button
          class='p-3 rounded-[35%] transition-all active:scale-90 wys-new-challenge-button'
          onClick={open}
        >
          <Plus />
        </button>
      </div>
      {isNewChallengePanel() && <NewChallengePanel close={close} />}
    </>
  );
};
