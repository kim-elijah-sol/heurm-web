import { type Component } from 'solid-js';
import { createNewChallengeForm } from '~/features/new-challenge/hook';
import { NewChallengeTitleInput } from '~/features/new-challenge/ui';
import { FlowColorSelect, Panel } from '~/shared/ui';

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

  return (
    <Panel.Blured close={props.close} autoClose={false}>
      {(close) => (
        <form
          onSubmit={handleSubmit(close)}
          class='w-full h-full touch-none flex flex-col justify-between px-4 pb-4 pt-[152px]'
        >
          <Panel.CloseButton onClick={close} />

          <div>
            <NewChallengeTitleInput
              value={title()}
              onInput={handleInputTitle}
            />

            <FlowColorSelect color={color} setColor={setColor} />
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
