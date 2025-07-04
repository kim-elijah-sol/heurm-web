import clsx from 'clsx';
import { children, createSignal, type Component, type JSX } from 'solid-js';
import { Portal } from 'solid-js/web';
import './slide-panel.ui.css';

type Props = {
  close: () => void;
  children: (close: () => void) => JSX.Element;
  class?: string;
};

export const SlidePanel: Component<Props> = (props) => {
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
          'fixed inset-0 z-50 bg-white heurm-slide-panel-animation flex flex-col p-4 touch-none',
          transition() ? 'heurm-slide-panel-fade-out' : '',
          props.class
        )}
      >
        {resolved()}
      </div>
    </Portal>
  );
};
