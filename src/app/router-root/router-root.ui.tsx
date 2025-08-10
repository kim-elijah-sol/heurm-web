import { RouteSectionProps } from '@solidjs/router';
import { Component } from 'solid-js';
import { Navigation } from '~/features/layout/ui';

export const RouterRoot: Component<RouteSectionProps> = (props) => {
  return (
    <>
      <div class='p-4 pb-[112px]'>{props.children}</div>
      <Navigation />
    </>
  );
};
