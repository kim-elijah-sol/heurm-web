import clsx from 'clsx';
import { createSignal } from 'solid-js';
import { Portal } from 'solid-js/web';
import './blured-panel.ui.css';

type Props = {
  close: () => void;
};

export const BluredPanel = (props: Props) => {
  const [transition, setTransition] = createSignal(false);

  const close = () => {
    setTransition(true);
    setTimeout(() => {
      props.close();
    }, 300);
  };

  return (
    <Portal>
      <div
        on:click={close}
        class={clsx(
          'fixed inset-0 z-50 backdrop-blur-md wys-blured-panel-animation',
          transition() ? 'wys-blured-panel-fade-out' : ''
        )}
      ></div>
    </Portal>
  );
};
