import { Component } from 'solid-js';
import { joinFormValidator } from '~/entities/join/validator';
import { createJoinForm } from '~/features/join/hook';
import { JoinBanner, JoinForm, JoinGuideTextBox } from '~/features/join/ui';
import { BluredPanel, X } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const JoinPanel: Component<Props> = (props) => {
  const {
    step,
    email,
    setEmail,
    password,
    setPassword,
    getDisplayType,
    joinFormHeight,
    handleSubmit,
  } = createJoinForm();

  return (
    <BluredPanel close={props.close} autoClose={false}>
      {(close) => (
        <div class='w-full h-full touch-none flex flex-col items-center justify-center px-4'>
          <button
            type='button'
            onClick={close}
            class='p-2 rounded-[35%] transition-all active:scale-90 active:bg-red-600 bg-red-500 absolute right-6 top-6'
          >
            <X />
          </button>

          <JoinBanner />

          <JoinGuideTextBox step={step} />

          <JoinForm onSubmit={handleSubmit} height={joinFormHeight}>
            <JoinForm.Email
              isSummitable={() =>
                joinFormValidator.shape.email.safeParse(email()).success
              }
              email={email}
              setEmail={setEmail}
              displayType={getDisplayType('email')}
            />

            <JoinForm.Password
              isSummitable={() =>
                joinFormValidator.shape.password.safeParse(password()).success
              }
              password={password}
              setPassword={setPassword}
              displayType={getDisplayType('password')}
            />
          </JoinForm>
        </div>
      )}
    </BluredPanel>
  );
};
