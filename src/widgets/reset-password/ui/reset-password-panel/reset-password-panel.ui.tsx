import { Component } from 'solid-js';
import { loginHelperFormValidator } from '~/entities/login-helper/validator';
import { getLoginHelperStepDisplayType } from '~/features/login-helper/fx';
import { LoginHelperBanner, LoginHelperForm } from '~/features/login-helper/ui';
import { getResetPasswordStepValue } from '~/features/reset-password/fx';
import { createResetPasswordForm } from '~/features/reset-password/hook/create-reset-password-form.hook';
import { BluredPanel, X } from '~/shared/ui';

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

          <LoginHelperBanner>
            No Worries,
            <br />
            Regain Access to
            <br />
            Your Account
          </LoginHelperBanner>

          <LoginHelperForm onSubmit={handleSubmit} height={formHeight}>
            <LoginHelperForm.Email
              isSummitable={() =>
                loginHelperFormValidator.shape.email.safeParse(email()).success
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
                loginHelperFormValidator.shape.verifyCode.safeParse(
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
                loginHelperFormValidator.shape.password.safeParse(password())
                  .success
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
    </BluredPanel>
  );
};
