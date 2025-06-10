import { type Component } from 'solid-js';
import { joinSchema } from '~/entities/join';
import { getJoinStepValue } from '~/features/join/fx';
import { createJoinForm } from '~/features/join/hook';
import { getLoginHelperStepDisplayType } from '~/features/login-helper/fx';
import {
  LoginHelperBanner,
  LoginHelperForm,
  LoginHelperGuideTextBox,
} from '~/features/login-helper/ui';
import { Panel } from '~/shared/ui';

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
    formHeight,
    handleSubmit,
    verifyCode,
    setVerifyCode,
    restResendSecond,
    handleResend,
  } = createJoinForm();

  return (
    <Panel.Blured close={props.close} autoClose={false}>
      {(close) => (
        <div class='w-full h-full touch-none flex flex-col items-center justify-center px-4'>
          <Panel.CloseButton onClick={close} />

          <LoginHelperBanner>
            Join is
            <br />
            First Win!
          </LoginHelperBanner>

          <LoginHelperGuideTextBox
            step={step}
            getStepValue={getJoinStepValue}
            email={<>Enter your join email</>}
            password={
              <>
                Set a password to
                <br />
                secure your account
              </>
            }
            verify={
              <>
                Enter the code
                <br />
                we've sent to your email
              </>
            }
            done={
              <>
                Thanks for join
                <br />
                Win Yourself!
                <br />
                Let’s start building
                <br />
                your winning habits today!
              </>
            }
          />

          <LoginHelperForm onSubmit={handleSubmit} height={formHeight}>
            <LoginHelperForm.Email
              isSummitable={() =>
                joinSchema.postJoinRequestSchema.shape.email.safeParse(email())
                  .success
              }
              email={email}
              setEmail={setEmail}
              displayType={() =>
                getLoginHelperStepDisplayType(step(), 'email')(getJoinStepValue)
              }
            />

            <LoginHelperForm.Password
              isSummitable={() =>
                joinSchema.postJoinRequestSchema.shape.password.safeParse(
                  password()
                ).success
              }
              password={password}
              setPassword={setPassword}
              displayType={() =>
                getLoginHelperStepDisplayType(
                  step(),
                  'password'
                )(getJoinStepValue)
              }
            />

            <LoginHelperForm.Verify
              restResendSecond={restResendSecond}
              onResend={handleResend}
              isSummitable={() =>
                joinSchema.postVerifyEmailRequestSchema.shape.code.safeParse(
                  verifyCode()
                ).success
              }
              verifyCode={verifyCode}
              setVerifyCode={setVerifyCode}
              displayType={() =>
                getLoginHelperStepDisplayType(
                  step(),
                  'verify'
                )(getJoinStepValue)
              }
            />

            <LoginHelperForm.Done
              displayType={() =>
                getLoginHelperStepDisplayType(step(), 'done')(getJoinStepValue)
              }
              onLogin={() => {
                close();
              }}
            />
          </LoginHelperForm>
        </div>
      )}
    </Panel.Blured>
  );
};
