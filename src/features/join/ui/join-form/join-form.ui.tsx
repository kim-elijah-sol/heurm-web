import { Accessor, children, type Component, type JSX } from 'solid-js';
import './join-form.ui.css';

type Props = {
  height: Accessor<number>;
  children: JSX.Element;
  onSubmit: (e: SubmitEvent) => void;
};

export const JoinForm: Component<Props> = (props) => {
  const resolved = children(() => props.children);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        props.onSubmit(e);
      }}
      class='relative w-full transition-all duration-300 overflow-y-hidden join-form'
      style={{
        height: `${props.height()}px`,
      }}
    >
      {resolved()}
    </form>
  );
};
