import { createSignal, onCleanup, onMount } from 'solid-js';
import { For, Portal } from 'solid-js/web';
import { ADD_TOAST_EVENT_NAME } from '~/shared/constant';
import { Toast } from '~/shared/model';
import { ToastItem } from '~/shared/ui';

export const ToastPortal = () => {
  const [toasts, setToasts] = createSignal<Toast[]>([]);

  const handleAddToast = (event: Event) => {
    const {
      detail: { text },
    } = event as CustomEvent<{ text: string }>;

    const toast: Toast = {
      id: new Date().valueOf(),
      text,
    };

    setToasts((toasts) => toasts.concat(toast));

    setTimeout(() => {
      setToasts((toasts) => toasts.filter(({ id }) => id !== toast.id));
    }, 3000);
  };

  onMount(() => {
    window.addEventListener(ADD_TOAST_EVENT_NAME, handleAddToast);
  });

  onCleanup(() => {
    window.removeEventListener(ADD_TOAST_EVENT_NAME, handleAddToast);
  });

  return (
    <Portal mount={document.querySelector('#toast-portal') as Node}>
      <For each={toasts()}>{(toast) => <ToastItem text={toast.text} />}</For>
    </Portal>
  );
};
