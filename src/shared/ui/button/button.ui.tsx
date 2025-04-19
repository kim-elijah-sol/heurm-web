import clsx from 'clsx';
import type { Component, JSX } from 'solid-js';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

type Size = 'fit' | 'full';

type Variant = 'emerald' | 'warning' | 'text' | 'border' | 'link';

type Props = ButtonProps & {
  size?: Size;
  variant?: Variant;
};

export const Button: Component<Props> = ({
  size = 'fit',
  variant = 'emerald',
  type = 'button',
  class: className,
  ...props
}) => {
  const widthClass = size === 'fit' ? 'w-fit' : 'w-full';

  const buttonBase =
    'transition-all font-semibold px-4 h-9 rounded-lg text-sm active:scale-[0.98]';

  const emeraldButton =
    'bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 text-white';

  const warningButton =
    'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white';

  const textButton = 'text-slate-700 hover:bg-slate-100 active:bg-slate-200';

  const borderButton =
    'text-slate-700 hover:bg-slate-100 active:bg-slate-200 border border-slate-300';

  const linkButton = 'text-emerald-500 hover:bg-slate-100 active:bg-slate-200';

  const variantClass =
    variant === 'emerald'
      ? emeraldButton
      : variant === 'warning'
      ? warningButton
      : variant === 'text'
      ? textButton
      : variant === 'border'
      ? borderButton
      : linkButton;

  return (
    <button
      type={type}
      class={clsx(className, widthClass, buttonBase, variantClass)}
      {...props}
    />
  );
};
