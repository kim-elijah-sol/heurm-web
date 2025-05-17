import { Component } from 'solid-js';
import './toast-item.ui.css';

type Props = {
  text: string;
};

export const ToastItem: Component<Props> = (props) => {
  return (
    <div
      class='fixed top-8 toast bg-gray-500/70 backdrop-blur-md rounded-[24px] py-1 px-4 text-center left-4 right-4 text-white font-semibold'
      innerHTML={props.text}
    />
  );
};
