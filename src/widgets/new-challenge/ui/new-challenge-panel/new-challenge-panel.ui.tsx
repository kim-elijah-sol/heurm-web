import { Component } from 'solid-js';
import { useChallenges } from '~/features/main/hook';
import { createNewChallengeForm } from '~/features/new-challenge/hook';
import {
  NewChallengeCTAButton,
  NewChallengeTitleInput,
} from '~/features/new-challenge/ui';
import { BluredPanel, ChallengeColorSelect, X } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const NewChallengePanel: Component<Props> = (props) => {
  const {
    title,
    handleInputTitle,
    color,
    setColor,
    handleSubmit,
    submitDisabled,
  } = createNewChallengeForm();

  const { addNewChallenge } = useChallenges;

  return (
    <BluredPanel close={props.close} autoClose={false}>
      {(close) => (
        <form
          onSubmit={(e) =>
            handleSubmit(e)(({ title, color }) => {
              addNewChallenge({
                id: new Date().valueOf(),
                title,
                color,
                challengeItems: [],
              });
              close();
            })
          }
          class='w-full h-full touch-none flex flex-col justify-between px-4 pb-4 pt-[152px]'
        >
          <button
            type='button'
            onClick={close}
            class='p-2 rounded-[35%] transition-all active:scale-90 bg-red-500 absolute right-6 top-6'
          >
            <X />
          </button>

          <div>
            <NewChallengeTitleInput
              value={title()}
              onInput={handleInputTitle}
            />

            <ChallengeColorSelect color={color} setColor={setColor} />
          </div>

          <NewChallengeCTAButton disabled={submitDisabled} color={color} />
        </form>
      )}
    </BluredPanel>
  );
};
