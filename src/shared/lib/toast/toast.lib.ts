import { ADD_TOAST_EVENT_NAME } from '~/shared/constant';

export const toast = {
  open: (text: string) => {
    const event = new CustomEvent(ADD_TOAST_EVENT_NAME, { detail: { text } });
    window.dispatchEvent(event);
  },
};
