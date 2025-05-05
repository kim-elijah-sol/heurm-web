type Props = {
  src: string;
  onClick: () => void;
};

export const UserAvatar = (props: Props) => {
  const src = () => props.src;

  return (
    <>
      <div
        onClick={props.onClick}
        class='w-12 h-12 rounded-full overflow-hidden border border-gray-300'
      >
        <img src={src()} alt='' class='w-full h-full' />
      </div>
    </>
  );
};
