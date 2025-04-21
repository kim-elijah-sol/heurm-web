import clsx from 'clsx';
import { Component, JSX, splitProps } from 'solid-js';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

type Size = 'fit' | 'full';

type Variant = 'emerald' | 'warning' | 'text' | 'border' | 'link';

type Props = ButtonProps & {
  size?: Size;
  variant?: Variant;
};

export const Button: Component<Props> = (props) => {
  const [customProps, rest] = splitProps(props, [
    'size',
    'variant',
    'type',
    'class',
  ]);

  const widthClass = () => (customProps.size === 'fit' ? 'w-fit' : 'w-full');

  const variantClass = () => {
    switch (customProps.variant) {
      case 'emerald':
        return 'bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600 text-white';
      case 'warning':
        return 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white';
      case 'text':
        return 'text-slate-700 hover:bg-slate-100 active:bg-slate-200';
      case 'border':
        return 'text-slate-700 hover:bg-slate-100 active:bg-slate-200 border border-slate-300';
      case 'link':
        return 'text-emerald-500 hover:bg-slate-100 active:bg-slate-200';
      default:
        return '';
    }
  };

  const classList = () =>
    clsx(
      customProps.class,
      widthClass(),
      'transition-all font-semibold px-4 h-9 rounded-lg text-sm active:scale-[0.98]',
      variantClass()
    );

  return (
    <button type={customProps.type ?? 'button'} class={classList()} {...rest} />
  );
};
