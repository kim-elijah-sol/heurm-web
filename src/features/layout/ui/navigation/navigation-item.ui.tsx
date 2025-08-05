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
    <A
      href={props.href}
      class='flex flex-col w-[74px] gap-1 items-center transition-all duration-300 active:scale-95 active:bg-gray-300/50 py-2 rounded-[28px]'
    >
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
