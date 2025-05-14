import { children, Component, JSX } from 'solid-js';
import './login-helper-banner.ui.css';

type Props = {
  children: JSX.Element;
};

export const LoginHelperBanner: Component<Props> = (props) => {
  const resolved = children(() => props.children);

  return (
    <div class='login-helper-banner'>
      <p class='text-center font-bold text-3xl leading-12 relative overflow-hidden mb-6 login-banner'>
        {resolved()}
      </p>
    </div>
  );
};
