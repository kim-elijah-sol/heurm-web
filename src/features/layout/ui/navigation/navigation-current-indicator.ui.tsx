import { useLocation } from '@solidjs/router';
import clsx from 'clsx';
import { type Component } from 'solid-js';
import { LayoutConstant } from '~/entities/layout';

export const NavigationCurrentIndicator: Component<{}> = () => {
  const location = useLocation();

  const currentLinkIndex = () =>
    LayoutConstant.NAVIGATION_ANCHORS.findIndex(
      (anchor) => anchor.href === location.pathname
    );

  return (
    <div
      class={clsx(
        'absolute left-1 top-1 bottom-1 rounded-[28px] transition-all duration-300 bg-gray-200/50',
        LayoutConstant.NAVIGATION_ANCHOR_WIDTH_PX
      )}
      style={{
        transform: `translateX(${
          currentLinkIndex() * LayoutConstant.NAVIGATION_ANCHOR_WIDTH
        }px)`,
      }}
    />
  );
};
