import { Component } from 'solid-js';
import { X } from '../../icons';

type Props = {
  onClick: () => void;
};

export const CloseButton: Component<Props> = (props) => {
  return (
    <button
      type='button'
      onClick={props.onClick}
      class='p-2 rounded-[35%] transition-all active:scale-90 active:bg-red-600 bg-red-500 absolute right-6 top-6'
    >
      <X />
    </button>
  );
};
