import { Component } from 'solid-js';
import './toast-item.ui.css';

type Props = {
  text: string;
};

export const ToastItem: Component<Props> = (props) => {
  return (
    <div
      class='toast fixed top-8 bg-gray-500/70 flex items-center justify-center backdrop-blur-md rounded-[24px] py-1 px-4 left-4 right-4 text-white font-semibold min-h-12 z-[99]'
      innerHTML={props.text}
    />
  );
};
