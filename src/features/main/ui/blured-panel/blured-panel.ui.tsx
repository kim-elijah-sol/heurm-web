import clsx from 'clsx';
import { children, createSignal, JSX, onCleanup, onMount } from 'solid-js';
import { Portal } from 'solid-js/web';
import './blured-panel.ui.css';

type Props = {
  close: () => void;
  children: (close: () => void) => JSX.Element;
  autoClose?: boolean;
};

export const BluredPanel = (props: Props) => {
  const [transition, setTransition] = createSignal(false);

  const close = () => {
    setTransition(true);
    setTimeout(() => {
      props.close();
    }, 300);
  };

  const resolved = children(() => props.children(close));

  const autoClose = () => props.autoClose ?? true;

  onMount(() => {
    document.querySelector('html')!.style.overflowY = 'hidden';
  });

  onCleanup(() => {
    document.querySelector('html')!.style.overflowY = 'auto';
  });

  return (
    <Portal>
      <div
        on:click={autoClose() ? close : undefined}
        class={clsx(
          'fixed inset-0 z-50 backdrop-blur-md wys-blured-panel-animation',
          transition() ? 'wys-blured-panel-fade-out' : ''
        )}
      >
        {resolved()}
      </div>
    </Portal>
  );
};
