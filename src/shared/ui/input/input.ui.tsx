import clsx from 'clsx';
import type { Component, JSX } from 'solid-js';

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

type Props = InputProps & {
  error?: boolean;
};

export const Input: Component<Props> = ({
  type = 'text',
  error = false,
  class: className,
  ...props
}) => {
  const inputBase =
    'placeholder:text-slate-300 text-sm px-4 h-9 rounded-lg outline-none inset-ring-1 focus:inset-ring-2 transition-all';

  const emeraldInput = 'inset-ring-slate-200 focus:inset-ring-emerald-400';

  const errorInput = 'inset-ring-rose-300 focus:inset-ring-rose-400';

  const variantClass = !error ? emeraldInput : errorInput;

  return (
    <input
      type={type}
      class={clsx(className, inputBase, variantClass)}
      {...props}
    />
  );
};
