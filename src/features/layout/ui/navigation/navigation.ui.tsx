import { useLocation } from '@solidjs/router';
import { For, Show, type Component } from 'solid-js';
import { LayoutConstant } from '~/entities/layout';
import { isNavigationHide } from '../../fx';
import { NavigationAnchor } from './navigation-anchor.ui';
import { NavigationCurrentIndicator } from './navigation-current-indicator.ui';
import './navigation.ui.css';
import { NewFlowButton } from './new-flow-button.ui';

export const Navigation: Component<{}> = () => {
  const location = useLocation();

  const isMain = () => location.pathname === '/';

  if (isNavigationHide(location.pathname)) return <></>;

  return (
    <Show when={isNavigationHide(location.pathname) === false}>
      <nav
        class='heurm-navigation fixed bottom-4 p-1 bg-white z-30 rounded-[32px] flex justify-between w-max transition-all duration-300'
        style={{
          left: isMain() ? 'calc(50% - 40px)' : '50%',
        }}
      >
        <For each={LayoutConstant.NAVIGATION_ANCHORS}>
          {(anchor) => <NavigationAnchor {...anchor} />}
        </For>

        <NavigationCurrentIndicator />
      </nav>
      {isMain() && <NewFlowButton />}
    </Show>
  );
};
