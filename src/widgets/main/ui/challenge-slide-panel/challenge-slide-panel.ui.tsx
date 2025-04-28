import { SlidePanel } from '~/features/main';

type Props = {
  close: () => void;
};

export const ChallengeSlidePanel = (props: Props) => {
  return <SlidePanel close={props.close}>{(close) => <></>}</SlidePanel>;
};
