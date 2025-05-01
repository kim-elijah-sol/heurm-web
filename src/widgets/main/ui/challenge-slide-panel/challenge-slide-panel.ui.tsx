import { CHALLENGE_COLOR } from '~/entities/main';
import {
  ChallengeSlidePanelCompleteItem,
  ChallengeSlidePanelCountableItem,
  ChallengeSlidePanelDeleteButton,
  ChallengeSlidePanelTop,
} from '~/features/main';
import { SlidePanel } from '~/shared/ui';

type Props = {
  close: () => void;
  color: (typeof CHALLENGE_COLOR)[number];
};

export const ChallengeSlidePanel = (props: Props) => {
  return (
    <SlidePanel close={props.close}>
      {(close) => (
        <>
          <ChallengeSlidePanelTop close={close} />

          <div class='flex-1 overflow-y-auto flex flex-col items-center'>
            <div class='w-full flex flex-col gap-4 mb-4'>
              <ChallengeSlidePanelCompleteItem color={props.color} />
              <ChallengeSlidePanelCountableItem
                type='over'
                value='push-up'
                color={props.color}
              />
              <ChallengeSlidePanelCountableItem
                color={props.color}
                type='under'
                value='100m sprint'
              />
            </div>

            <ChallengeSlidePanelDeleteButton />
          </div>
        </>
      )}
    </SlidePanel>
  );
};
