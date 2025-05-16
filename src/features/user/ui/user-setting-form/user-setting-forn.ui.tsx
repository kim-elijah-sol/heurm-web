import { children, Component, JSX } from 'solid-js';

type Props = {
  children: JSX.Element;
};

export const UserSettingForm: Component<Props> = (props) => {
  return <div class='w-full'>{children(() => props.children)()}</div>;
};
