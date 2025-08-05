import { A, useLocation } from '@solidjs/router';
import clsx from 'clsx';
import { type Component } from 'solid-js';

type Props = {
  href: string;
  name: string;
  icon: Component<{ stroke: string }>;
};

export const NavigationItem: Component<Props> = (props) => {
  const location = useLocation();

  const isCurrent = () => location.pathname === props.href;

  return (
    <A href={props.href} class='flex flex-col gap-1 items-center'>
      {props.icon({
        stroke: isCurrent() ? '#333' : '#999',
      })}
      <p
        class={clsx(
          'text-[12px] font-bold transition-all duration-500',
          isCurrent() ? 'text-[#333]' : 'text-[#999]'
        )}
      >
        {props.name}
      </p>
    </A>
  );
};
