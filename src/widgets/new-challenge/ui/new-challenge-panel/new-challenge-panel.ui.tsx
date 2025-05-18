import { Component } from 'solid-js';
import { useChallenges } from '~/features/main/hook';
import { createNewChallengeForm } from '~/features/new-challenge/hook';
import { NewChallengeTitleInput } from '~/features/new-challenge/ui';
import { ChallengeColorSelect, Panel } from '~/shared/ui';

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
    <Panel.Blured close={props.close} autoClose={false}>
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
          <Panel.CloseButton onClick={close} />

          <div>
            <NewChallengeTitleInput
              value={title()}
              onInput={handleInputTitle}
            />

            <ChallengeColorSelect color={color} setColor={setColor} />
          </div>

          <Panel.CTAButton
            type='submit'
            color={color}
            disabled={submitDisabled()}
          >
            Create
          </Panel.CTAButton>
        </form>
      )}
    </Panel.Blured>
  );
};
