import clsx from 'clsx';
import { Component, createMemo, JSX } from 'solid-js';

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

type Props = InputProps & {
  error?: boolean;
};

export const Input: Component<Props> = (props) => {
  const { type = 'text', error, class: className, ...rest } = props;

  const variantClass = createMemo(() => {
    if (error) return 'inset-ring-rose-300 focus:inset-ring-rose-400';
    else return 'inset-ring-slate-200 focus:inset-ring-emerald-400';
  });

  const classList = createMemo(() =>
    clsx(
      className,
      'placeholder:text-slate-300 text-sm px-4 h-9 rounded-lg outline-none inset-ring-1 focus:inset-ring-2 transition-all',
      variantClass()
    )
  );

  return <input type={type} class={classList()} {...rest} />;
};
