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
    verifyCode,
    setVerifyCode,
    restResendSecond,
    handleResend,
    startCountDown,
  } = createLoginHelperForm();

  const formHeight = () => getLoginHelperFormHeight(step());

  const handleSubmit = () => {
    if (step() === 'email') {
      setStep('verify');
      startCountDown();
    } else if (step() === 'verify') {
      setStep('password');
    } else {
      setStep('done');
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
