import clsx from 'clsx';
import { type Component, type JSX } from 'solid-js';
import { X } from '../icons';
import { useBottomSheetClose } from './use-bottom-sheet-close.hook';

type Props = {
  children: JSX.Element;
  className?: string;
};

export const _BottomSheetTop: Component<Props> = (props) => {
  return (
    <div
      data-testid='bottom-sheet-top'
      class={clsx('flex justify-between items-center', props.className)}
    >
      {props.children}
    </div>
  );
};

const Title: Component<{ children: JSX.Element }> = (props) => {
  return (
    <p data-testid='bottom-sheet-top-title' class='font-semibold text-xl'>
      {props.children}
    </p>
  );
};

const CloseButton: Component = () => {
  const close = useBottomSheetClose();

  return (
    <button
      data-testid='bottom-sheet-top-close-button'
      onClick={close}
      class='p-[7px] rounded-[42%] transition-all active:scale-[.95] bg-red-400 active:bg-red-500'
    >
      <X size={24} />
    </button>
  );
};

export const BottomSheetTop = Object.assign(_BottomSheetTop, {
  Title,
  CloseButton,
});
