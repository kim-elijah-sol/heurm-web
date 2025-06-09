import { Component } from 'solid-js';
import { resetPasswordSchema } from '~/entities/reset-password';
import { getLoginHelperStepDisplayType } from '~/features/login-helper/fx';
import {
  LoginHelperBanner,
  LoginHelperForm,
  LoginHelperGuideTextBox,
} from '~/features/login-helper/ui';
import { getResetPasswordStepValue } from '~/features/reset-password/fx';
import { createResetPasswordForm } from '~/features/reset-password/hook/create-reset-password-form.hook';
import { Panel } from '~/shared/ui';

type Props = {
  close: () => void;
};

export const ResetPasswordPanel: Component<Props> = (props) => {
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
  } = createResetPasswordForm();

  return (
    <Panel.Blured close={props.close} autoClose={false}>
      {(close) => (
        <div class='w-full h-full touch-none flex flex-col items-center justify-center px-4'>
          <Panel.CloseButton onClick={close} />

          <LoginHelperBanner>
            No Worries,
            <br />
            Regain Access to
            <br />
            Your Account
          </LoginHelperBanner>

          <LoginHelperGuideTextBox
            step={step}
            getStepValue={getResetPasswordStepValue}
            email={
              <>
                Enter the email address
                <br />
                linked to your account
              </>
            }
            verify={
              <>
                Enter the code
                <br />
                we've sent to your email
              </>
            }
            password={
              <>
                Set a new password to
                <br />
                secure your account
              </>
            }
            done={
              <>
                You can now log in
                <br />
                with your new password
              </>
            }
          />

          <LoginHelperForm onSubmit={handleSubmit} height={formHeight}>
            <LoginHelperForm.Email
              isSummitable={() =>
                resetPasswordSchema.resetPasswordRequestSchema.shape.email.safeParse(
                  email()
                ).success
              }
              email={email}
              setEmail={setEmail}
              displayType={() =>
                getLoginHelperStepDisplayType(
                  step(),
                  'email'
                )(getResetPasswordStepValue)
              }
            />

            <LoginHelperForm.Verify
              restResendSecond={restResendSecond}
              onResend={handleResend}
              isSummitable={() =>
                resetPasswordSchema.verifyEmailRequestSchema.shape.code.safeParse(
                  verifyCode()
                ).success
              }
              verifyCode={verifyCode}
              setVerifyCode={setVerifyCode}
              displayType={() =>
                getLoginHelperStepDisplayType(
                  step(),
                  'verify'
                )(getResetPasswordStepValue)
              }
            />

            <LoginHelperForm.Password
              isSummitable={() =>
                resetPasswordSchema.resetPasswordRequestSchema.shape.newPassword.safeParse(
                  password()
                ).success
              }
              password={password}
              setPassword={setPassword}
              displayType={() =>
                getLoginHelperStepDisplayType(
                  step(),
                  'password'
                )(getResetPasswordStepValue)
              }
            />

            <LoginHelperForm.Done
              displayType={() =>
                getLoginHelperStepDisplayType(
                  step(),
                  'done'
                )(getResetPasswordStepValue)
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
