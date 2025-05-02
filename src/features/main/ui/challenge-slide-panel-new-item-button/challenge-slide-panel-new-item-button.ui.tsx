import { createSignal } from 'solid-js';
import { BluredPanel, Plus } from '~/shared/ui';
import { NewChallengeItemPanel } from '../new-challenge-item-panel';
import './challenge-slide-panel-new-item-button.ui.css';

export const ChallengeSlidePanelNewItemButton = () => {
  const [isBluredPanelShow, setIsBluredPanelShow] = createSignal(false);

  return (
    <>
      <button
        class='bg-slate-200 p-2 rounded-[35%] transition-all active:bg-slate-300 active:scale-90'
        onClick={() => setIsBluredPanelShow(true)}
      >
        <Plus className='stroke-slate-800' />
      </button>

      {isBluredPanelShow() && (
        <BluredPanel
          close={() => setIsBluredPanelShow(false)}
          autoClose={false}
        >
          {(close) => <NewChallengeItemPanel close={close} />}
        </BluredPanel>
      )}
    </>
  );
};
