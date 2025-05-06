import { createSignal } from 'solid-js';
import {
  NewChallengeCTAButton,
  NewChallengeTitleInput,
} from '~/features/new-challenge-panel/ui';
import { ChallengeColor } from '~/shared/model';
import { BluredPanel, ChallengeColorSelect, X } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const NewChallengePanel = (props: Props) => {
  const [title, setTitle] = createSignal<string>('');

  const [color, setColor] = createSignal<ChallengeColor>('red');

  return (
    <BluredPanel close={props.close} autoClose={false}>
      {(close) => (
        <div class='w-full h-full touch-none flex flex-col justify-between px-4 pb-4 pt-[152px]'>
          <button
            onClick={close}
            class='p-2 rounded-[35%] transition-all active:scale-90 bg-red-500 absolute right-6 top-6'
          >
            <X />
          </button>

          <div>
            <NewChallengeTitleInput
              value={title()}
              onInput={(e) => setTitle(e.target.value)}
            />

            <ChallengeColorSelect color={color()} setColor={setColor} />
          </div>

          <NewChallengeCTAButton
            disabled={title().trim().length === 0}
            color={color()}
            onClick={close}
          />
        </div>
      )}
    </BluredPanel>
  );
};
