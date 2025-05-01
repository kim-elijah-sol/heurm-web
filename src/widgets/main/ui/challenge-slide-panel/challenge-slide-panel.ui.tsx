import clsx from 'clsx';
import { createSignal, For } from 'solid-js';
import { CHALLENGE_BG_COLOR, CHALLENGE_COLOR } from '~/entities/main';
import {
  ChallengeColorSelect,
  ChallengeSlidePanelCompleteItem,
  ChallengeSlidePanelCountableItem,
  ChallengeSlidePanelDeleteButton,
  ChallengeSlidePanelTop,
} from '~/features/main';
import { Check, SlidePanel } from '~/shared/ui';

type Props = {
  close: () => void;
  color: (typeof CHALLENGE_COLOR)[number];
};

export const ChallengeSlidePanel = (props: Props) => {
  const [color, setColor] = createSignal<(typeof CHALLENGE_COLOR)[number]>(
    props.color
  );

  return (
    <SlidePanel close={props.close}>
      {(close) => (
        <>
          <ChallengeSlidePanelTop close={close} />

          <div class='flex-1 overflow-y-auto flex flex-col items-center'>
            <ChallengeColorSelect color={color()} setColor={setColor} className='mb-4' />

            <div class='w-full flex flex-col gap-4 mb-4'>
              <ChallengeSlidePanelCompleteItem color={color()} />
              <ChallengeSlidePanelCountableItem
                type='over'
                value='push-up'
                color={color()}
              />
              <ChallengeSlidePanelCountableItem
                color={color()}
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
