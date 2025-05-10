import { Component } from 'solid-js';

type Props = {
  name: string;
  onChangeName: (name: string) => void;
};

export const NameInput: Component<Props> = (props) => {
  return (
    <input
      type='text'
      class='font-semibold'
      value={props.name}
      onInput={(e) => props.onChangeName(e.target.value)}
    />
  );
};
