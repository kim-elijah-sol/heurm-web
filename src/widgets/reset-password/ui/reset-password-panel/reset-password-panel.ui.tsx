import { Component } from 'solid-js';
import { JoinForm } from '~/features/join/ui';
import { getResetPasswordStepDisplayType } from '~/features/reset-password/fx';
import { createResetPasswordForm } from '~/features/reset-password/hook/create-reset-password-form.hook';
import { BluredPanel, X } from '~/shared/ui';
import { loginHelperFormValidator } from '~/shared/validator/login-helper-form.validator';

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
    resetPasswordFormHeight,
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

          <JoinForm onSubmit={handleSubmit} height={resetPasswordFormHeight}>
            <JoinForm.Email
              isSummitable={() =>
                loginHelperFormValidator.shape.email.safeParse(email()).success
              }
              email={email}
              setEmail={setEmail}
              displayType={() =>
                getResetPasswordStepDisplayType(step(), 'email')
              }
            />

            <JoinForm.Verify
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
                getResetPasswordStepDisplayType(step(), 'verify')
              }
            />

            <JoinForm.Password
              isSummitable={() =>
                loginHelperFormValidator.shape.password.safeParse(password())
                  .success
              }
              password={password}
              setPassword={setPassword}
              displayType={() =>
                getResetPasswordStepDisplayType(step(), 'password')
              }
            />

            <JoinForm.Done
              displayType={() =>
                getResetPasswordStepDisplayType(step(), 'done')
              }
              onLogin={() => {
                close();
              }}
            />
          </JoinForm>
        </div>
      )}
    </BluredPanel>
  );
};
