import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/solid-query';
import { Component, JSX } from 'solid-js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

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
