import { A, useLocation } from '@solidjs/router';
import clsx from 'clsx';
import { type Component } from 'solid-js';
import { LayoutConstant, LayoutType } from '~/entities/layout';

export const NavigationAnchor: Component<LayoutType.NavigationAnchor> = (
  props
) => {
  const location = useLocation();

  const isCurrent = () => location.pathname === props.href;

  return (
    <A
      href={props.href}
      class={clsx(
        'flex flex-col gap-1 items-center transition-all duration-300 active:scale-95 active:bg-gray-300/50 py-2 rounded-[28px] z-2',
        LayoutConstant.NAVIGATION_ANCHOR_WIDTH_PX
      )}
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
