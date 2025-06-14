import clsx from 'clsx';
import { children, createSignal, type Component, type JSX } from 'solid-js';
import { Portal } from 'solid-js/web';
import './blured-panel.ui.css';

type Props = {
  close: () => void;
  children: (close: () => void) => JSX.Element;
  autoClose?: boolean;
};

export const BluredPanel: Component<Props> = (props) => {
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
      <div
        on:click={autoClose() ? close : undefined}
        class={clsx(
          'fixed inset-0 z-50 backdrop-blur-sm wys-blured-panel-animation',
          transition() ? 'wys-blured-panel-fade-out' : ''
        )}
      >
        {resolved()}
      </div>
    </Portal>
  );
};
