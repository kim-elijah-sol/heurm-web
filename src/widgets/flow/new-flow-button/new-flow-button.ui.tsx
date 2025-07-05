import { NewFlowPanel } from '~/panel-pages';
import { createBoolean } from '~/shared/hook';
import { Plus } from '~/shared/ui';
import './new-flow-button.css';

export const NewFlowButton = () => {
  const [isNewFlowPanel, open, close] = createBoolean();

  return (
    <>
      <div class='flex justify-center'>
        <button
          class='p-3 rounded-[42%] transition-all active:scale-90 heurm-new-flow-button'
          onClick={open}
        >
          <Plus size={32} />
        </button>
      </div>
      {isNewFlowPanel() && <NewFlowPanel close={close} />}
    </>
  );
};
