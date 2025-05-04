import { createSignal } from 'solid-js';
import { ChallengeItemType } from '~/entities/main';
import { BluredPanel, Plus } from '~/shared/ui';
import { NewChallengeItemPanel } from '../new-challenge-item-panel';
import './challenge-slide-panel-new-item-button.ui.css';

type Props = {
  onNewChallengeItem: (challengeItem: ChallengeItemType) => void;
};

export const ChallengeSlidePanelNewItemButton = (props: Props) => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  return (
    <>
      <button
        class='bg-slate-200 p-3 rounded-[35%] transition-all active:bg-slate-300 active:scale-90'
        onClick={() => setIsBluredPanelShow(true)}
      >
        <Plus size={28} className='stroke-slate-800' />
      </button>

      {isBluredPanelShow() && (
        <BluredPanel
          close={() => setIsBluredPanelShow(false)}
          autoClose={false}
        >
          {(close) => (
            <NewChallengeItemPanel
              onSubmit={props.onNewChallengeItem}
              close={close}
            />
          )}
        </BluredPanel>
      )}
    </>
  );
};
