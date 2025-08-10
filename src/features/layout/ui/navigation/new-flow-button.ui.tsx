import { NewFlowPanel } from '~/panel-pages';
import { createBoolean } from '~/shared/hook';
import { Plus } from '~/shared/ui';
import './new-flow-button.ui.css';

export const NewFlowButton = () => {
  const [isNewFlowPanel, open, close] = createBoolean();

  return (
    <>
      <button
        onClick={open}
        class='heurm-new-flow-button-liquid w-18 h-18 flex items-center justify-center flex-col gap-1 rounded-[32px] fixed bottom-4 z-30 -translate-x-1/2 transition-all duration-300 active:scale-95! active:bg-gray-300/50! active:border-gray-200!'
        style={{
          left: `calc(50% + 129px)`,
        }}
      >
        <Plus size={24} stroke='#333' strokwWidth={3} />

        <p class='text-[12px] font-bold transition-all duration-500 text-[#333]'>
          New Flow
        </p>
      </button>
      {isNewFlowPanel() && <NewFlowPanel close={close} />}
    </>
  );
};
