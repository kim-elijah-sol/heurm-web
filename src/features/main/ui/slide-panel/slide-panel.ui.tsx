import clsx from 'clsx';
import { children, createSignal, JSX } from 'solid-js';
import { Portal } from 'solid-js/web';
import { X } from '~/shared/ui';
import './slide-panel.ui.css';

type Props = {
  close: () => void;
  children: (close: () => void) => JSX.Element;
};

export const SlidePanel = (props: Props) => {
  const [transition, setTransition] = createSignal(false);

  const close = () => {
    setTransition(true);
    setTimeout(() => {
      props.close();
    }, 300);
  };

  const resolved = children(() => props.children(close));

  return (
    <Portal>
      <div
        class={clsx(
          'fixed inset-0 z-50 bg-white wys-slide-panel-animation flex flex-col p-4 touch-none',
          transition() ? 'wys-slide-panel-fade-out' : ''
        )}
      >
        <div class='flex items-center justify-between mb-4'>
          <p class='font-semibold text-2xl'>💪 health</p>
          <button
            onClick={close}
            class='p-2 rounded-[35%] bg-red-400 transition-all active:bg-red-500 active:scale-[.95]'
          >
            <X size={24} />
          </button>
        </div>
        <div class='flex-1 overflow-y-auto'>{resolved()}</div>
      </div>
    </Portal>
  );
};
