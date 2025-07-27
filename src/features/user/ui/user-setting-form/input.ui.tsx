import clsx from 'clsx';
import { splitProps, type Component, type JSX } from 'solid-js';

type InputProps = JSX.IntrinsicElements['input'];

type Props = Required<Pick<InputProps, 'type'>> & Omit<InputProps, 'type'>;

export const Input: Component<Props> = (props) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <input
      class={clsx(
        'font-semibold px-4 py-4 rounded-[24px] w-full transition-all bg-slate-100 focus:bg-slate-200 placeholder:text-gray-400',
        local.class
      )}
      {...rest}
    />
  );
};
