import { A, useLocation } from '@solidjs/router';
import clsx from 'clsx';

type Props = {
  href: string;
  name: string;
};

export const NavigationItem = (props: Props) => {
  const location = useLocation();

  return (
    <A href={props.href} class='flex flex-col gap-3 items-center'>
      <p
        class={clsx(
          'text-sm transition-all duration-500',
          location.pathname === props.href
            ? 'text-[#333] font-bold'
            : 'text-[#999] font-medium'
        )}
      >
        {props.name}
      </p>
    </A>
  );
};
