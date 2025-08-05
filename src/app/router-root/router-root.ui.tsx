import { RouteSectionProps } from '@solidjs/router';
import { Component } from 'solid-js';
import { Navigation } from '~/features/layout/ui';

export const RouterRoot: Component<RouteSectionProps> = (props) => {
  return (
    <>
      {props.children}
      <Navigation />
    </>
  );
};
