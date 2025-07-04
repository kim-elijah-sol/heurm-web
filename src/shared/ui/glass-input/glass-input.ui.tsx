import clsx from 'clsx';
import { splitProps, type Component, type JSX } from 'solid-js';
import './glass-input.ui.css';

type Props = JSX.InputHTMLAttributes<HTMLInputElement>;

export const GlassInput: Component<Props> = (props) => {
  const [classProps, rest] = splitProps(props, ['class']);

  return (
    <input {...rest} class={clsx(classProps.class, 'heurm-glass-input')} />
  );
};
