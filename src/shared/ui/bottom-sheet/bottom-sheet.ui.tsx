import clsx from 'clsx';
import { children, createSignal, type Component, type JSX } from 'solid-js';
import { Portal } from 'solid-js/web';
import { BottomSheetCloseContext } from './bottom-sheet-close.context';
import './bottom-sheet.ui.css';

type Props = {
  close: () => void;
  children: (close: () => void) => JSX.Element;
  autoClose?: boolean;
};

export const BottomSheet: Component<Props> = (props) => {
  const [transition, setTransition] = createSignal(false);

  const close = () => {
    setTransition(true);
    setTimeout(() => {
      props.close();
    }, 300);
  };

  const resolved = children(() => props.children(close));

  const autoClose = () => props.autoClose ?? true;

  return (
    <Portal>
      <BottomSheetCloseContext.Provider value={close}>
        <div
          onClick={autoClose() ? close : undefined}
          class={clsx(
            'fixed inset-0 z-50 backdrop-blur-sm heurm-bottom-sheet-animation',
            transition() ? 'heurm-bottom-sheet-fade-out' : ''
          )}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            class={clsx(
              'absolute bottom-0 left-0 right-0 px-4 pb-4 pt-4 bg-white rounded-tr-[16px] rounded-tl-[16px] heurm-bottom-sheet-foreground-fade-in',
              transition() ? 'heurm-bottom-sheet-foreground-fade-out' : ''
            )}
          >
            {resolved()}
          </div>
        </div>
      </BottomSheetCloseContext.Provider>
    </Portal>
  );
};
