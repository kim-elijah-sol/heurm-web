import clsx from 'clsx';
import { splitProps, type Component, type JSX } from 'solid-js';

type InputProps = JSX.IntrinsicElements['input'];

type Props = Required<Pick<InputProps, 'type'>> & Omit<InputProps, 'type'>;

export const Input: Component<Props> = (props) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <input
      class={clsx(
        'font-semibold text-md py-3 px-4 rounded-[12px] bg-slate-100 transition-all duration-300 w-full focus:bg-slate-200',
        local.class
      )}
      {...rest}
    />
  );
};
