import clsx from 'clsx';
import { Component, JSX, splitProps } from 'solid-js';

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

type Props = InputProps & {
  error?: boolean;
};

export const Input: Component<Props> = (props) => {
  const [customProps, rest] = splitProps(props, ['type', 'error', 'class']);

  const variantClass = () => {
    if (customProps.error)
      return 'inset-ring-rose-300 focus:inset-ring-rose-400';
    else return 'inset-ring-slate-200 focus:inset-ring-emerald-400';
  };

  const classList = () =>
    clsx(
      customProps.class,
      'placeholder:text-slate-300 text-sm px-4 h-9 rounded-lg outline-none inset-ring-1 focus:inset-ring-2 transition-all',
      variantClass()
    );

  return (
    <input type={customProps.type ?? 'text'} class={classList()} {...rest} />
  );
};
