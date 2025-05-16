import { children, Component, JSX } from 'solid-js';

type Props = {
  children: JSX.Element;
};

export const Label: Component<Props> = (props) => {
  return (
    <p class='mb-3 ml-1 font-semibold text-gray-500'>
      {children(() => props.children)()}
    </p>
  );
};
