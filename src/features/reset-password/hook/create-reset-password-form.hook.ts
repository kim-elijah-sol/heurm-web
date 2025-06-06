import { resetPasswordQueries } from '~/entities/reset-password';
import { getLoginHelperFormHeight } from '~/features/login-helper/fx';
import { createLoginHelperForm } from '~/features/login-helper/hook';

export const createResetPasswordForm = () => {
  const {
    step,
    setStep,
    email,
    setEmail,
    password,
    setPassword,
    id,
    setId,
    verifyCode,
    setVerifyCode,
    restResendSecond,
    startCountDown,
  } = createLoginHelperForm();

  const verifyEmailSend = resetPasswordQueries.verifyEmailSendMutation(
    ({ id }) => {
      setId(id);
      setStep('verify');
      startCountDown();
    }
  );

  const verifyEmail = resetPasswordQueries.verifyEmailMutation(() => {
    setStep('password');
  });

  const resetPassword = resetPasswordQueries.resetPasswordMutation(() => {
    setStep('done');
  });

  const formHeight = () => getLoginHelperFormHeight(step());

  const handleSubmit = () => {
    if (step() === 'email') handleSendVerifyEmail();
    else if (step() === 'verify') handleVerify();
    else handleResetPassword();
  };

  const handleSendVerifyEmail = () => {
    verifyEmailSend.mutate({ email: email() });
  };

  const handleVerify = () => {
    verifyEmail.mutate({
      email: email(),
      id: id(),
      code: verifyCode(),
    });
  };

  const handleResetPassword = () => {
    resetPassword.mutate({
      email: email(),
      id: id(),
      newPassword: password(),
    });
  };

  const handleResend = () => {
    if (restResendSecond() === 0) {
      handleSendVerifyEmail();
    }
  };

  return {
    step,
    email,
    setEmail,
    handleSubmit,
    password,
    setPassword,
    verifyCode,
    setVerifyCode,
    restResendSecond,
    handleResend,
    formHeight,
  };
};
