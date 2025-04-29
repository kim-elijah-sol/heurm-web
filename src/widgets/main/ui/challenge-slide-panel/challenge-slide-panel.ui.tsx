import { ChallengeSlidePanelTop } from '~/features/main';
import { SlidePanel } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const ChallengeSlidePanel = (props: Props) => {
  return (
    <SlidePanel close={props.close}>
      {(close) => (
        <>
          <ChallengeSlidePanelTop close={close} />
        </>
      )}
    </SlidePanel>
  );
};
