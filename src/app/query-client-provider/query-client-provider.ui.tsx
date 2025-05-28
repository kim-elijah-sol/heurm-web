import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/solid-query';
import { children, Component, JSX } from 'solid-js';

const queryClient = new QueryClient();

type Props = {
  children: JSX.Element;
};

export const QueryClientProvider: Component<Props> = (props) => {
  const resolved = children(() => props.children);

  return (
    <TanStackQueryClientProvider client={queryClient}>
      {resolved()}
    </TanStackQueryClientProvider>
  );
};
