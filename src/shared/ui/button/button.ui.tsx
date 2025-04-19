import clsx from 'clsx';
import type { Component, JSX } from 'solid-js';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = ButtonProps & {
  size?: 'fit' | 'full';
};

export const Button: Component<Props> = ({
  size = 'fit',
  class: className,
  ...props
}) => {
  const widthClass = size === 'fit' ? 'w-fit' : 'w-full';

  const buttonBase =
    'transition-all text-white font-semibold px-4 h-9 rounded-lg text-sm active:scale-[0.98]';

  const emeraldButton =
    'bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600';

  return (
    <button
      class={clsx(className, widthClass, buttonBase, emeraldButton)}
      {...props}
    />
  );
};
