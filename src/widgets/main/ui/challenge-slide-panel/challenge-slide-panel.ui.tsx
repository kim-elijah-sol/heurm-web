import {
  ChallengeSlidePanelCompleteItem,
  ChallengeSlidePanelDeleteButton,
  ChallengeSlidePanelTop,
} from '~/features/main';
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

          <div class='flex-1 overflow-y-auto flex flex-col items-center'>
            <div class='w-full flex flex-col gap-4 mb-4'>
              <ChallengeSlidePanelCompleteItem />
            </div>

            <ChallengeSlidePanelDeleteButton />
          </div>
        </>
      )}
    </SlidePanel>
  );
};
