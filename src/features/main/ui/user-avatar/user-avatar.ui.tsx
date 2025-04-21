type Props = {
  src: string;
};

export const UserAvatar = (props: Props) => {
  const src = () => props.src;

  return (
    <div class='w-10 h-10 rounded-full overflow-hidden border border-gray-300'>
      <img src={src()} alt='' class='w-full h-full' />
    </div>
  );
};
