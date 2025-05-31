import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/solid-query';
import { Component, JSX } from 'solid-js';

const queryClient = new QueryClient();

type Props = {
  children: JSX.Element;
};

export const QueryClientProvider: Component<Props> = (props) => {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {props.children}
    </TanStackQueryClientProvider>
  );
};
