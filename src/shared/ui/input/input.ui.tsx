import clsx from 'clsx';
import { splitProps, type Component, type JSX } from 'solid-js';

type Props = JSX.InputHTMLAttributes<HTMLInputElement>;

export const Input: Component<Props> = (props) => {
  const [classProps, rest] = splitProps(props, ['class']);

  return (
    <input
      {...rest}
      class={clsx(
        classProps.class,
        'font-semibold px-4 py-4 rounded-[24px] w-full transition-all bg-slate-100 focus:bg-slate-200 placeholder:text-gray-400'
      )}
    />
  );
};
