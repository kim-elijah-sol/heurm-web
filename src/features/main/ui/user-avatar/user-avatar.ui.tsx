type Props = {
  src: string;
};

export const UserAvatar = (props: Props) => {
  const src = () => props.src;

  return (
    <div class='w-12 h-12 rounded-full overflow-hidden border border-gray-300'>
      <img src={src()} alt='' class='w-full h-full' />
    </div>
  );
};
