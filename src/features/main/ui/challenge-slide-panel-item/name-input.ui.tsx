type Props = {
  name: string;
  onChangeName: (name: string) => void;
};

export const NameInput = (props: Props) => {
  return (
    <input
      type='text'
      class='font-semibold'
      value={props.name}
      onInput={(e) => props.onChangeName(e.target.value)}
    />
  );
};
