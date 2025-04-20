import clsx from 'clsx';
import { Component, createMemo, JSX } from 'solid-js';

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

type Size = 'fit' | 'full';

type Variant = 'emerald' | 'warning' | 'text' | 'border' | 'link';

type Props = ButtonProps & {
  size?: Size;
  variant?: Variant;
};

export const Button: Component<Props> = (props) => {
  const {
    size = 'fit',
    variant = 'emerald',
    type = 'button',
    class: className,
    ...rest
  } = props;

  const widthClass = createMemo(() => (size === 'fit' ? 'w-fit' : 'w-full'));

  const variantClass = createMemo(() => {
    switch (variant) {
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
  });

  const classList = createMemo(() =>
    clsx(
      className,
      widthClass(),
      'transition-all font-semibold px-4 h-9 rounded-lg text-sm active:scale-[0.98]',
      variantClass()
    )
  );

  return <button type={type} class={classList()} {...rest} />;
};
