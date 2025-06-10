import { splitProps, type Component, type JSX } from 'solid-js';

type ImgProps = JSX.IntrinsicElements['img'];

type Props = Required<Pick<ImgProps, 'src'>> & Omit<ImgProps, 'src'>;

export const ServerImage: Component<Props> = (props) => {
  const [localProps, rest] = splitProps(props, ['src']);

  const src = () => localProps.src;

  return <img src={`${import.meta.env.VITE_API_BASE_URL}${src()}`} {...rest} />;
};
